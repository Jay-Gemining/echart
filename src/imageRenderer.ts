// 优化的纯Canvas图像渲染器 - TypeScript版本
// 提供高性能、类型安全的图表到PNG转换功能

import * as echarts from "echarts";
import type { ECharts, EChartsOption } from "echarts";
import { createCanvas, registerFont } from "canvas";
import type { Canvas, CanvasRenderingContext2D } from "canvas";
import { readFileSync, existsSync } from "fs";
import { config } from "./config.ts";
import type {
  ICanvasRenderer,
  RenderOptions,
  RenderContext,
  RenderQueueItem,
  ImageOptions,
  ExtendedEChartsOption,
  PerformanceMetrics,
  RenderStats,
} from "./types/index.ts";

/**
 * Canvas渲染器选项
 */
interface CanvasRendererOptions {
  enableQueue?: boolean;
  maxQueueSize?: number;
  enableMetrics?: boolean;
  enableCache?: boolean;
}

/**
 * 渲染缓存项
 */
interface CacheItem {
  buffer: Buffer;
  timestamp: number;
  accessCount: number;
}

/**
 * 纯Canvas渲染器类
 * 提供高性能、类型安全的图表到PNG转换功能
 */
export class CanvasRenderer implements ICanvasRenderer {
  private chinaMapData: any = null;
  private isMapDataLoaded: boolean = false;
  private renderingQueue: Map<string, RenderQueueItem> = new Map();
  private cache: Map<string, CacheItem> = new Map();
  private metrics: PerformanceMetrics;
  private stats: RenderStats;
  private options: CanvasRendererOptions;

  /**
   * 构造函数
   */
  constructor(options: CanvasRendererOptions = {}) {
    this.options = {
      enableQueue: true,
      maxQueueSize: 100,
      enableMetrics: true,
      enableCache: false,
      ...options,
    };

    this.metrics = {
      renderTime: 0,
      memoryUsage: 0,
      requestCount: 0,
      errorCount: 0,
      concurrentRequests: 0,
    };

    this.stats = {
      totalRequests: 0,
      successfulRenders: 0,
      failedRenders: 0,
      averageRenderTime: 0,
      peakMemoryUsage: 0,
    };

    // 定期清理缓存和队列
    this.startCleanupTimer();
  }

  /**
   * 渲染图表为PNG
   */
  async renderToPNG(
    chartConfig: EChartsOption,
    options: RenderOptions = {},
  ): Promise<Buffer> {
    const startTime = performance.now();
    this.updateMetrics("request");

    const renderOptions: Required<RenderOptions> = {
      width: options.width ?? 800,
      height: options.height ?? 600,
      backgroundColor: options.backgroundColor ?? "#ffffff",
      devicePixelRatio: options.devicePixelRatio ?? 2,
      quality: options.quality ?? 0.9,
      renderer: options.renderer ?? "canvas",
      timeout: options.timeout ?? 10000,
    };

    // 生成渲染ID
    const renderId = this.generateRenderId(chartConfig, renderOptions);

    // 检查缓存
    if (this.options.enableCache) {
      const cached = this.getFromCache(renderId);
      if (cached) {
        console.log(`🚀 Cache hit for render ID: ${renderId}`);
        return cached;
      }
    }

    // 检查渲染队列
    if (this.options.enableQueue && this.renderingQueue.has(renderId)) {
      console.log(`⏳ Waiting for existing render: ${renderId}`);
      const existingItem = this.renderingQueue.get(renderId)!;
      return await existingItem.promise;
    }

    // 创建渲染Promise
    const renderPromise = this.doRender(chartConfig, renderOptions);

    // 添加到渲染队列
    if (this.options.enableQueue) {
      const queueItem: RenderQueueItem = {
        id: renderId,
        config: chartConfig,
        options: renderOptions,
        promise: renderPromise,
        timestamp: Date.now(),
      };

      this.renderingQueue.set(renderId, queueItem);
      this.cleanupQueue();
    }

    try {
      const buffer = await renderPromise;
      const renderTime = performance.now() - startTime;

      // 更新统计信息
      this.updateStats(renderTime, true);

      // 缓存结果
      if (this.options.enableCache) {
        this.addToCache(renderId, buffer);
      }

      console.log(
        `✅ Render completed: ${renderId} (${renderTime.toFixed(2)}ms)`,
      );
      return buffer;
    } catch (error) {
      this.updateStats(performance.now() - startTime, false);
      this.updateMetrics("error");
      throw error;
    } finally {
      if (this.options.enableQueue) {
        this.renderingQueue.delete(renderId);
      }
    }
  }

  /**
   * 执行实际渲染
   */
  private async doRender(
    chartConfig: EChartsOption,
    options: Required<RenderOptions>,
  ): Promise<Buffer> {
    let renderContext: Partial<RenderContext> = {};

    try {
      // 验证图表配置
      this.validateChartConfig(chartConfig);

      // 创建渲染上下文
      renderContext = await this.createRenderContext(chartConfig, options);

      // 等待渲染完成
      await this.waitForRenderComplete(renderContext.chart!, options.timeout);

      // 生成PNG
      const pngBuffer = this.generatePNG(renderContext.canvas!, options);

      const size = this.formatBytes(pngBuffer.length);
      console.log(
        `✅ Canvas渲染成功: ${options.width}x${options.height}, 大小: ${size}`,
      );

      return pngBuffer;
    } catch (error) {
      console.error("❌ Canvas渲染失败:", error);
      return await this.createErrorImage(
        error instanceof Error ? error.message : "Unknown error",
        options,
      );
    } finally {
      // 清理渲染上下文
      this.cleanupRenderContext(renderContext);
    }
  }

  /**
   * 创建渲染上下文
   */
  private async createRenderContext(
    chartConfig: EChartsOption,
    options: Required<RenderOptions>,
  ): Promise<RenderContext> {
    // 创建高分辨率Canvas
    const canvasWidth = options.width * options.devicePixelRatio;
    const canvasHeight = options.height * options.devicePixelRatio;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    // 设置高清显示
    ctx.scale(options.devicePixelRatio, options.devicePixelRatio);

    // 设置背景
    if (options.backgroundColor && options.backgroundColor !== "transparent") {
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, options.width, options.height);
    }

    // 准备渲染环境
    this.setupRenderingEnvironment(canvas, options);

    // 检查并加载地图数据
    if (this.isMapChart(chartConfig)) {
      await this.ensureMapDataLoaded();
    }

    // 初始化ECharts实例
    const chart = echarts.init(canvas as any, null, {
      renderer: "canvas",
      width: options.width,
      height: options.height,
      devicePixelRatio: options.devicePixelRatio,
    });

    // 优化图表配置
    const optimizedConfig = this.optimizeChartConfig(chartConfig);

    // 设置图表配置
    chart.setOption(optimizedConfig, true);

    return {
      canvas,
      chart,
      config: optimizedConfig,
      options,
      startTime: performance.now(),
    };
  }

  /**
   * 清理渲染上下文
   */
  private cleanupRenderContext(context: Partial<RenderContext>): void {
    try {
      if (context.chart) {
        context.chart.dispose();
      }
    } catch (error) {
      console.warn("清理图表实例时出错:", error);
    }

    this.cleanupRenderingEnvironment();
  }

  /**
   * 设置渲染环境
   */
  private setupRenderingEnvironment(
    canvas: Canvas,
    options: Required<RenderOptions>,
  ): void {
    // 设置全局变量供ECharts使用
    (global as any).document = {
      createElement: (tag: string) => {
        if (tag === "canvas") {
          return canvas;
        }
        return {
          style: {},
          getAttribute: () => null,
          setAttribute: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
        };
      },
      getElementsByTagName: () => [],
      getElementById: () => canvas,
      body: {
        appendChild: () => {},
        removeChild: () => {},
      },
    };

    (global as any).window = {
      devicePixelRatio: options.devicePixelRatio,
      innerWidth: options.width,
      innerHeight: options.height,
      addEventListener: () => {},
      removeEventListener: () => {},
      requestAnimationFrame: (callback: FrameRequestCallback) =>
        setTimeout(callback, 16),
      cancelAnimationFrame: (id: number) => clearTimeout(id),
      getComputedStyle: () => ({}),
    };

    (global as any).navigator = {
      userAgent: "Canvas-Renderer-TypeScript/2.0",
    };
  }

  /**
   * 清理渲染环境
   */
  private cleanupRenderingEnvironment(): void {
    delete (global as any).document;
    delete (global as any).window;
    delete (global as any).navigator;
  }

  /**
   * 优化图表配置
   */
  private optimizeChartConfig(
    chartConfig: EChartsOption,
  ): ExtendedEChartsOption {
    const optimized: ExtendedEChartsOption = JSON.parse(
      JSON.stringify(chartConfig),
    );

    // Canvas渲染优化
    if (optimized.animation === undefined) {
      optimized.animation = false; // 禁用动画提高性能
    }

    // 优化文字渲染
    if (optimized.textStyle) {
      optimized.textStyle.fontSize = optimized.textStyle.fontSize || 12;
    }

    // 优化图例位置（避免重叠）
    if (
      optimized.series &&
      Array.isArray(optimized.series) &&
      optimized.series.length > 3 &&
      optimized.legend
    ) {
      if (
        typeof optimized.legend === "object" &&
        !Array.isArray(optimized.legend)
      ) {
        (optimized.legend as any).top = "15%";
      }
      optimized.grid = optimized.grid || {};
      (optimized.grid as any).top = "25%";
    }

    // 添加渲染器标识
    optimized.rendererId = this.generateRenderId(chartConfig, {});

    // 性能优化选项
    optimized.optimizations = {
      disableAnimation: optimized.animation === false,
      enableProgressive: false,
      largeDataMode: false,
    };

    return optimized;
  }

  /**
   * 等待渲染完成
   */
  private async waitForRenderComplete(
    chart: ECharts,
    timeout: number = 3000,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      let completed = false;
      let timeoutId: NodeJS.Timeout;

      const complete = () => {
        if (!completed) {
          completed = true;
          clearTimeout(timeoutId);
          resolve();
        }
      };

      // 监听渲染完成事件
      chart.on("finished", complete);

      // 超时处理
      timeoutId = setTimeout(() => {
        if (!completed) {
          completed = true;
          chart.off("finished", complete);
          console.warn(`渲染超时 (${timeout}ms)，使用当前状态`);
          resolve(); // 不拒绝，使用当前渲染状态
        }
      }, timeout);

      // 额外的等待时间确保渲染完成
      setTimeout(complete, Math.min(1000, timeout / 3));
    });
  }

  /**
   * 生成PNG
   */
  private generatePNG(
    canvas: Canvas,
    options: Required<RenderOptions>,
  ): Buffer {
    try {
      return (canvas as any).toBuffer("image/png", {
        compressionLevel: 6,
        filters: (canvas as any).PNG_FILTER_NONE,
        palette: true,
        quality: options.quality,
      });
    } catch (error) {
      console.warn("使用默认PNG选项生成图像:", error);
      return (canvas as any).toBuffer("image/png");
    }
  }

  /**
   * 确保地图数据已加载
   */
  private async ensureMapDataLoaded(): Promise<void> {
    if (this.isMapDataLoaded) {
      return;
    }

    try {
      const mapDataPath = config.data.chinaMapPath;

      if (!existsSync(mapDataPath)) {
        throw new Error(`地图数据文件不存在: ${mapDataPath}`);
      }

      const mapData = JSON.parse(readFileSync(mapDataPath, "utf8"));
      echarts.registerMap("china", mapData);

      this.chinaMapData = mapData;
      this.isMapDataLoaded = true;

      console.log("✅ 地图数据加载成功");
    } catch (error) {
      console.error("❌ 地图数据加载失败:", error);
      throw new Error(
        `地图数据加载失败: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * 检查是否为地图图表
   */
  isMapChart(chartConfig: EChartsOption): boolean {
    return !!(
      chartConfig.series &&
      Array.isArray(chartConfig.series) &&
      chartConfig.series.some((series: any) => series.type === "map")
    );
  }

  /**
   * 验证图表配置
   */
  validateChartConfig(chartConfig: EChartsOption): boolean {
    if (!chartConfig || typeof chartConfig !== "object") {
      throw new Error("图表配置必须是一个对象");
    }

    if (!chartConfig.series || !Array.isArray(chartConfig.series)) {
      throw new Error("图表配置必须包含series数组");
    }

    if (chartConfig.series.length === 0) {
      throw new Error("series数组不能为空");
    }

    return true;
  }

  /**
   * 创建错误图像
   */
  private async createErrorImage(
    errorMessage: string,
    options: Required<RenderOptions>,
  ): Promise<Buffer> {
    const canvas = createCanvas(options.width, options.height);
    const ctx = canvas.getContext("2d");

    // 背景
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, options.width, options.height);

    // 错误边框
    ctx.strokeStyle = "#ff4444";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, options.width - 20, options.height - 20);

    // 错误图标
    ctx.fillStyle = "#ff4444";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("⚠️", options.width / 2, options.height / 2 - 40);

    // 错误文本
    ctx.font = "16px Arial";
    const lines = this.wrapText(errorMessage, options.width - 40, ctx);
    const lineHeight = 24;
    const totalHeight = lines.length * lineHeight;
    const startY = (options.height - totalHeight) / 2 + 20;

    lines.forEach((line, index) => {
      ctx.fillText(line, options.width / 2, startY + index * lineHeight);
    });

    // 时间戳
    ctx.font = "12px Arial";
    ctx.fillStyle = "#666666";
    ctx.fillText(
      `Generated at ${new Date().toLocaleString()}`,
      options.width / 2,
      options.height - 20,
    );

    return canvas.toBuffer("image/png");
  }

  /**
   * 文本换行处理
   */
  private wrapText(
    text: string,
    maxWidth: number,
    ctx: CanvasRenderingContext2D,
  ): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * 生成渲染ID
   */
  private generateRenderId(
    chartConfig: EChartsOption,
    options: Partial<RenderOptions>,
  ): string {
    const configStr = JSON.stringify(chartConfig);
    const optionsStr = JSON.stringify(options);
    const combined = configStr + optionsStr;

    // 简单哈希算法
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 转换为32位整数
    }

    return `render_${Math.abs(hash).toString(16)}`;
  }

  /**
   * 格式化字节大小
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * 缓存管理
   */
  private addToCache(key: string, buffer: Buffer): void {
    if (!this.options.enableCache) return;

    this.cache.set(key, {
      buffer,
      timestamp: Date.now(),
      accessCount: 1,
    });

    // 清理过期缓存
    this.cleanupCache();
  }

  private getFromCache(key: string): Buffer | null {
    if (!this.options.enableCache) return null;

    const item = this.cache.get(key);
    if (item) {
      item.accessCount++;
      return item.buffer;
    }
    return null;
  }

  private cleanupCache(): void {
    const maxAge = 30 * 60 * 1000; // 30分钟
    const maxSize = 50; // 最大缓存项数
    const now = Date.now();

    // 删除过期项
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > maxAge) {
        this.cache.delete(key);
      }
    }

    // 如果缓存过大，删除最少使用的项
    if (this.cache.size > maxSize) {
      const entries = Array.from(this.cache.entries()).sort(
        (a, b) => a[1].accessCount - b[1].accessCount,
      );

      const toDelete = entries.slice(0, entries.length - maxSize);
      toDelete.forEach(([key]) => this.cache.delete(key));
    }
  }

  /**
   * 队列管理
   */
  private cleanupQueue(): void {
    if (!this.options.enableQueue) return;

    const maxAge = 5 * 60 * 1000; // 5分钟
    const now = Date.now();

    for (const [key, item] of this.renderingQueue.entries()) {
      if (now - item.timestamp > maxAge) {
        this.renderingQueue.delete(key);
      }
    }

    // 限制队列大小
    if (this.renderingQueue.size > (this.options.maxQueueSize || 100)) {
      const entries = Array.from(this.renderingQueue.entries());
      const toDelete = entries.slice(
        0,
        entries.length - (this.options.maxQueueSize || 100),
      );
      toDelete.forEach(([key]) => this.renderingQueue.delete(key));
    }
  }

  /**
   * 性能指标更新
   */
  private updateMetrics(type: "request" | "error"): void {
    if (!this.options.enableMetrics) return;

    switch (type) {
      case "request":
        this.metrics.requestCount++;
        this.metrics.concurrentRequests++;
        break;
      case "error":
        this.metrics.errorCount++;
        break;
    }

    this.metrics.memoryUsage = process.memoryUsage().heapUsed;
  }

  private updateStats(renderTime: number, success: boolean): void {
    if (!this.options.enableMetrics) return;

    this.stats.totalRequests++;
    if (success) {
      this.stats.successfulRenders++;
    } else {
      this.stats.failedRenders++;
    }

    this.stats.averageRenderTime =
      (this.stats.averageRenderTime * (this.stats.totalRequests - 1) +
        renderTime) /
      this.stats.totalRequests;

    this.stats.peakMemoryUsage = Math.max(
      this.stats.peakMemoryUsage,
      process.memoryUsage().heapUsed,
    );

    this.metrics.concurrentRequests = Math.max(
      0,
      this.metrics.concurrentRequests - 1,
    );
  }

  /**
   * 启动清理定时器
   */
  private startCleanupTimer(): void {
    setInterval(() => {
      this.cleanupCache();
      this.cleanupQueue();
    }, 60000); // 每分钟清理一次
  }

  /**
   * 获取性能指标
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * 获取渲染统计
   */
  getStats(): RenderStats {
    return { ...this.stats };
  }

  /**
   * 重置统计信息
   */
  resetStats(): void {
    this.stats = {
      totalRequests: 0,
      successfulRenders: 0,
      failedRenders: 0,
      averageRenderTime: 0,
      peakMemoryUsage: 0,
    };
  }

  /**
   * 获取支持的图表类型
   */
  static getSupportedChartTypes(): readonly string[] {
    return ["line", "bar", "pie", "map", "scatter", "radar", "gauge"] as const;
  }
}

// 创建单例实例
export const canvasRenderer = new CanvasRenderer({
  enableQueue: true,
  maxQueueSize: 100,
  enableMetrics: true,
  enableCache: false,
});

/**
 * 便捷导出函数
 */
export async function renderChartToPNG(
  chartConfig: EChartsOption,
  options: RenderOptions = {},
): Promise<Buffer> {
  return await canvasRenderer.renderToPNG(chartConfig, options);
}

/**
 * 创建新的渲染器实例
 */
export function createRenderer(
  options?: CanvasRendererOptions,
): CanvasRenderer {
  return new CanvasRenderer(options);
}

export default canvasRenderer;
