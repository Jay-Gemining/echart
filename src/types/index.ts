// TypeScript类型定义文件
// 为ECharts服务器提供完整的类型支持

import type { EChartsOption, ECharts } from "echarts";

// ===== 基础类型定义 =====

/**
 * 图表类型枚举
 */
export type ChartType =
  | "line"
  | "histogram"
  | "pie"
  | "map"
  | "bar"
  | "scatter"
  | "radar"
  | "gauge";

/**
 * 渲染器类型
 */
export type RendererType = "canvas" | "svg";

/**
 * HTTP方法类型
 */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "PATCH";

// ===== 图表数据类型 =====

/**
 * 系列数据接口
 */
export interface SeriesData {
  name: string;
  data: number[];
}

/**
 * 折线图数据接口
 */
export interface LineChartData {
  title?: string;
  categories: string[];
  series: SeriesData[];
}

/**
 * 直方图数据接口
 */
export interface HistogramData {
  title?: string;
  categories: string[];
  data: number[];
}

/**
 * 饼图数据项
 */
export interface PieDataItem {
  name: string;
  value: number;
}

/**
 * 饼图数据接口
 */
export interface PieChartData {
  title?: string;
  data: PieDataItem[];
}

/**
 * 地图数据项
 */
export interface MapDataItem {
  name: string;
  value: number;
}

/**
 * 地图数据接口
 */
export interface MapChartData {
  title?: string;
  data: MapDataItem[];
}

/**
 * 通用图表数据类型
 */
export type ChartData =
  | LineChartData
  | HistogramData
  | PieChartData
  | MapChartData;

// ===== 图像渲染类型 =====

/**
 * 图像渲染选项
 */
export interface ImageOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  devicePixelRatio?: number;
  quality?: number;
}

/**
 * PNG生成请求接口
 */
export interface PNGGenerationRequest {
  chartType: ChartType;
  chartData: ChartData;
  imageOptions?: ImageOptions;
}

/**
 * 渲染配置选项
 */
export interface RenderOptions extends ImageOptions {
  renderer?: RendererType;
  timeout?: number;
}

// ===== 服务器配置类型 =====

/**
 * CORS配置
 */
export interface CorsConfig {
  origin: string | string[];
  methods: HttpMethod[];
  headers: string[];
}

/**
 * 服务器配置
 */
export interface ServerConfig {
  port: number;
  host: string;
  cors: CorsConfig;
}

/**
 * 数据文件配置
 */
export interface DataConfig {
  chinaMapPath: string;
}

/**
 * 图表配置
 */
export interface ChartConfig {
  line: {
    defaultTitle: string;
    grid: Record<string, any>;
    legend: {
      defaultTop: string;
      multiSeriesTop: string;
      multiSeriesThreshold: number;
    };
    colors: string[];
  };
  histogram: {
    defaultTitle: string;
    colors: {
      start: string;
      middle: string;
      end: string;
    };
    emphasis: {
      start: string;
      middle: string;
      end: string;
    };
  };
  pie: {
    defaultTitle: string;
    radius: [string, string];
    center: [string, string];
    colors: string[];
  };
  map: {
    defaultTitle: string;
    tooltipFormatter: string;
    visualMap: {
      left: string;
      top: string;
      text: [string, string];
      calculable: boolean;
      colors: [string, string];
    };
  };
}

/**
 * PNG配置
 */
export interface PNGConfig {
  defaultOptions: ImageOptions;
  limits: {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    maxFileSize: number;
  };
  presets: Record<string, { width: number; height: number }>;
  rendering: {
    timeout: number;
    retryCount: number;
    svgToImageDelay: number;
  };
}

/**
 * 环境配置
 */
export interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  logLevel: string;
}

/**
 * API配置
 */
export interface APIConfig {
  rateLimit: {
    windowMs: number;
    max: number;
  };
  timeout: number;
  maxBodySize: string;
}

/**
 * 主配置接口
 */
export interface Config {
  server: ServerConfig;
  data: DataConfig;
  charts: ChartConfig;
  provinceMapping: Record<string, string>;
  defaultData: {
    line: LineChartData;
    histogram: HistogramData;
    pie: PieDataItem[];
    map: MapDataItem[];
  };
  env: EnvironmentConfig;
  api: APIConfig;
  png: PNGConfig;
}

// ===== 错误类型 =====

/**
 * 应用错误类型
 */
export interface AppError {
  code: string;
  message: string;
  status?: number;
  details?: any;
}

/**
 * 验证结果接口
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// ===== 响应类型 =====

/**
 * API响应基础接口
 */
export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

/**
 * 健康检查响应
 */
export interface HealthCheckResponse {
  status: string;
  version: string;
  renderer: string;
  uptime: number;
  memory: NodeJS.MemoryUsage;
  timestamp: string;
}

// ===== 性能监控类型 =====

/**
 * 性能指标
 */
export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  requestCount: number;
  errorCount: number;
  concurrentRequests: number;
}

/**
 * 渲染统计
 */
export interface RenderStats {
  totalRequests: number;
  successfulRenders: number;
  failedRenders: number;
  averageRenderTime: number;
  peakMemoryUsage: number;
}

// ===== Canvas渲染器类型 =====

/**
 * Canvas渲染器接口
 */
export interface ICanvasRenderer {
  renderToPNG(
    chartConfig: EChartsOption,
    options?: RenderOptions,
  ): Promise<Buffer>;
  isMapChart(chartConfig: EChartsOption): boolean;
  validateChartConfig(chartConfig: EChartsOption): boolean;
}

/**
 * 渲染上下文
 */
export interface RenderContext {
  canvas: any;
  chart: ECharts;
  config: EChartsOption;
  options: RenderOptions;
  startTime: number;
}

/**
 * 渲染队列项
 */
export interface RenderQueueItem {
  id: string;
  config: EChartsOption;
  options: RenderOptions;
  promise: Promise<Buffer>;
  timestamp: number;
}

// ===== 工具类型 =====

/**
 * 深度可选类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 严格省略类型
 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * 可空类型
 */
export type Nullable<T> = T | null;

/**
 * 可选类型
 */
export type Optional<T> = T | undefined;

// ===== 扩展类型 =====

/**
 * 扩展ECharts选项类型
 */
export interface ExtendedEChartsOption extends EChartsOption {
  rendererId?: string;
  optimizations?: {
    disableAnimation?: boolean;
    enableProgressive?: boolean;
    largeDataMode?: boolean;
  };
}

/**
 * 图表配置构建器接口
 */
export interface ChartConfigBuilder {
  buildLineChart(data: LineChartData): EChartsOption;
  buildHistogramChart(data: HistogramData): EChartsOption;
  buildPieChart(data: PieChartData): EChartsOption;
  buildMapChart(data: MapChartData): EChartsOption;
}

// ===== 导出所有类型 =====
export type { EChartsOption, ECharts } from "echarts";

// 默认导出主要类型
export type { Config as default };
