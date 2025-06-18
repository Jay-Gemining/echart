// ECharts 服务器配置文件 - TypeScript版本
// 提供完整的类型安全和智能提示

import type {
  Config,
  ValidationResult,
  ServerConfig,
  DataConfig,
  ChartConfig,
  PNGConfig,
  EnvironmentConfig,
  APIConfig,
  LineChartData,
  HistogramData,
  PieDataItem,
  MapDataItem,
  ScatterChartData,
  MapType,
} from "./types/index.ts";

/**
 * 主配置对象
 */
export const config: Config = {
  // 服务器配置
  server: {
    port: parseInt(process.env.PORT || "3603", 10),
    host: process.env.HOST || "localhost",
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      headers: ["Content-Type"],
    },
  },

  // 数据文件路径
  data: {
    chinaMapPath: "data/china.json",
    worldMapPath: "data/world.json",
  },

  // 图表默认配置
  charts: {
    // 折线图配置
    line: {
      defaultTitle: "",
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      legend: {
        defaultTop: "10%",
        multiSeriesTop: "15%",
        multiSeriesThreshold: 3,
      },
      colors: [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
      ],
    },

    // 直方图配置
    histogram: {
      defaultTitle: "",
      colors: {
        start: "#83bff6",
        middle: "#188df0",
        end: "#188df0",
      },
      emphasis: {
        start: "#2378f7",
        middle: "#2378f7",
        end: "#83bff6",
      },
    },

    // 饼图配置
    pie: {
      defaultTitle: "",
      radius: ["40%", "70%"],
      center: ["60%", "50%"],
      colors: [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
    },

    // 地图配置
    map: {
      defaultTitle: "",
      tooltipFormatter: "{b}<br/>{c} 万元",
      visualMap: {
        left: "left",
        top: "bottom",
        text: ["高", "低"],
        calculable: true,
        colors: ["#e0ffff", "#006edd"],
      },
    },

    // 散点图配置
    scatter: {
      defaultTitle: "",
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      legend: {
        defaultTop: "10%",
      },
      colors: [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
      symbolSize: 20,
      emphasis: {
        scale: true,
        scaleSize: 30,
      },
      sizeRange: {
        min: 5,
        max: 50,
      },
      enableDynamicSize: true,
    },
  },

  // 地名映射配置
  provinceMapping: {
    // 直辖市
    北京: "北京市",
    天津: "天津市",
    上海: "上海市",
    重庆: "重庆市",

    // 省份
    河北: "河北省",
    山西: "山西省",
    辽宁: "辽宁省",
    吉林: "吉林省",
    黑龙江: "黑龙江省",
    江苏: "江苏省",
    浙江: "浙江省",
    安徽: "安徽省",
    福建: "福建省",
    江西: "江西省",
    山东: "山东省",
    河南: "河南省",
    湖北: "湖北省",
    湖南: "湖南省",
    广东: "广东省",
    海南: "海南省",
    四川: "四川省",
    贵州: "贵州省",
    云南: "云南省",
    陕西: "陕西省",
    甘肃: "甘肃省",
    青海: "青海省",
    台湾: "台湾省",

    // 自治区
    内蒙古: "内蒙古自治区",
    新疆: "新疆维吾尔自治区",
    西藏: "西藏自治区",
    广西: "广西壮族自治区",
    宁夏: "宁夏回族自治区",

    // 特别行政区
    香港: "香港特别行政区",
    澳门: "澳门特别行政区",
  },

  // 默认数据
  defaultData: {
    // 折线图默认数据
    line: {
      categories: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      series: [
        {
          name: "产品A",
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
        },
        {
          name: "产品B",
          data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149],
        },
        {
          name: "产品C",
          data: [150, 232, 201, 154, 190, 330, 410, 320, 280, 200, 180, 220],
        },
      ],
    },

    // 直方图默认数据
    histogram: {
      categories: [
        "18-25",
        "26-30",
        "31-35",
        "36-40",
        "41-45",
        "46-50",
        "51-55",
        "56-60",
        "60+",
      ],
      data: [320, 480, 650, 420, 380, 290, 180, 120, 80],
    },

    // 饼图默认数据
    pie: [
      { name: "苹果", value: 335 },
      { name: "三星", value: 310 },
      { name: "华为", value: 234 },
      { name: "小米", value: 135 },
      { name: "OPPO", value: 148 },
      { name: "其他", value: 98 },
    ],

    // 地图默认数据
    map: [
      { name: "北京市", value: 890 },
      { name: "天津市", value: 234 },
      { name: "上海市", value: 823 },
      { name: "重庆市", value: 451 },
      { name: "河北省", value: 234 },
      { name: "河南省", value: 567 },
      { name: "云南省", value: 345 },
      { name: "辽宁省", value: 432 },
      { name: "黑龙江省", value: 221 },
      { name: "湖南省", value: 543 },
      { name: "安徽省", value: 312 },
      { name: "山东省", value: 678 },
      { name: "新疆维吾尔自治区", value: 189 },
      { name: "江苏省", value: 745 },
      { name: "浙江省", value: 634 },
      { name: "江西省", value: 287 },
      { name: "湖北省", value: 456 },
      { name: "广西壮族自治区", value: 298 },
      { name: "甘肃省", value: 156 },
      { name: "山西省", value: 234 },
      { name: "内蒙古自治区", value: 167 },
      { name: "陕西省", value: 345 },
      { name: "吉林省", value: 198 },
      { name: "福建省", value: 423 },
      { name: "贵州省", value: 201 },
      { name: "广东省", value: 892 },
      { name: "青海省", value: 98 },
      { name: "西藏自治区", value: 65 },
      { name: "四川省", value: 512 },
      { name: "宁夏回族自治区", value: 87 },
      { name: "海南省", value: 123 },
      { name: "台湾省", value: 234 },
      { name: "香港特别行政区", value: 345 },
      { name: "澳门特别行政区", value: 67 },
    ],

    // 散点图默认数据
    scatter: {
      xAxisName: "",
      yAxisName: "",
      series: [
        {
          name: "系列1",
          data: [
            [28.8, 39.3],
            [36.5, 27.7],
            [81.8, 51.7],
            [31.6, 24.6],
            [77.0, 52.4],
            [91.4, 29.7],
            [60.4, 32.1],
            [20.4, 50.6],
            [91.4, 29.7],
            [44.0, 76.8],
            [83.6, 92.5],
            [32.4, 58.8],
          ],
          symbolSize: 50,
        },
        {
          name: "系列2",
          data: [
            [41.5, 66.2],
            [82.1, 78.2],
            [50.1, 36.4],
            [58.4, 24.5],
            [77.0, 52.4],
            [35.3, 85.4],
            [13.1, 49.1],
            [89.4, 17.6],
            [10.1, 22.4],
            [24.1, 36.5],
            [86.5, 68.3],
            [16.4, 55.9],
          ],
          symbolSize: 100,
        },
      ],
    },
  },

  // 环境配置
  env: {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    logLevel: process.env.LOG_LEVEL || "info",
  },

  // API配置
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 100, // 限制每个IP最多100次请求
    },
    timeout: 30000, // 30秒超时
    maxBodySize: "10mb",
  },

  // PNG图像生成配置
  png: {
    // 默认图像设置
    defaultOptions: {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
      quality: 0.9,
    },

    // 图像尺寸限制
    limits: {
      minWidth: 200,
      maxWidth: 2000,
      minHeight: 200,
      maxHeight: 2000,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    },

    // 预设尺寸
    presets: {
      small: { width: 400, height: 300 },
      medium: { width: 800, height: 600 },
      large: { width: 1200, height: 900 },
      hd: { width: 1920, height: 1080 },
    },

    // 渲染设置
    rendering: {
      timeout: 10000, // 10秒渲染超时
      retryCount: 2,
      svgToImageDelay: 500, // SVG渲染等待时间
    },
  },
};

/**
 * 验证配置的函数
 */
export function validateConfig(): ValidationResult {
  const errors: string[] = [];

  // 检查端口
  if (
    !Number.isInteger(config.server.port) ||
    config.server.port < 1 ||
    config.server.port > 65535
  ) {
    errors.push("Invalid server port");
  }

  // 检查数据文件路径
  if (!config.data.chinaMapPath) {
    errors.push("China map data path is required");
  }
  if (!config.data.worldMapPath) {
    errors.push("World map data path is required");
  }

  // 检查省份映射
  if (
    !config.provinceMapping ||
    Object.keys(config.provinceMapping).length === 0
  ) {
    errors.push("Province mapping is required");
  }

  // 检查PNG配置
  if (
    config.png.defaultOptions.width &&
    (config.png.defaultOptions.width < config.png.limits.minWidth ||
      config.png.defaultOptions.width > config.png.limits.maxWidth)
  ) {
    errors.push("Invalid default PNG width");
  }

  if (
    config.png.defaultOptions.height &&
    (config.png.defaultOptions.height < config.png.limits.minHeight ||
      config.png.defaultOptions.height > config.png.limits.maxHeight)
  ) {
    errors.push("Invalid default PNG height");
  }

  // 检查质量参数
  if (
    config.png.defaultOptions.quality !== undefined &&
    (config.png.defaultOptions.quality < 0 ||
      config.png.defaultOptions.quality > 1)
  ) {
    errors.push("PNG quality must be between 0 and 1");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 获取环境特定的配置
 */
export function getEnvConfig(): Config {
  return {
    ...config,
    server: {
      ...config.server,
      // 生产环境使用更严格的CORS设置
      cors: config.env.isProduction
        ? {
            origin: process.env.ALLOWED_ORIGINS?.split(",") || [
              "http://localhost:3000",
            ],
            methods: ["GET", "POST"],
            headers: ["Content-Type"],
          }
        : config.server.cors,
    },
  };
}

/**
 * 配置验证装饰器
 */
export function validateConfigDecorator<T extends (...args: any[]) => any>(
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const validation = validateConfig();
    if (!validation.isValid) {
      throw new Error(
        `Configuration validation failed: ${validation.errors.join(", ")}`,
      );
    }
    return originalMethod.apply(this, args);
  };
}

/**
 * 深度合并配置
 */
export function mergeConfig(
  baseConfig: Config,
  overrideConfig: Partial<Config>,
): Config {
  const merged = { ...baseConfig };

  for (const key in overrideConfig) {
    const value = overrideConfig[key as keyof Config];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      (merged as any)[key] = { ...merged[key as keyof Config], ...value };
    } else if (value !== undefined) {
      (merged as any)[key] = value;
    }
  }

  return merged;
}

/**
 * 获取配置值的类型安全函数
 */
export function getConfigValue<K extends keyof Config>(key: K): Config[K] {
  return config[key];
}

/**
 * 设置配置值的类型安全函数
 */
export function setConfigValue<K extends keyof Config>(
  key: K,
  value: Config[K],
): void {
  (config as any)[key] = value;
}

/**
 * 冻结配置对象，防止意外修改
 */
export function freezeConfig(): Readonly<Config> {
  return Object.freeze(config) as Readonly<Config>;
}

/**
 * 配置热重载功能
 */
export function reloadConfig(): Config {
  // 在实际应用中，这里可以从文件系统重新加载配置
  console.log("🔄 Configuration reloaded");
  return config;
}

/**
 * 获取配置摘要信息
 */
export function getConfigSummary(): {
  version: string;
  environment: string;
  server: { host: string; port: number };
  features: string[];
} {
  return {
    version: "2.0.0-typescript",
    environment: config.env.isProduction ? "production" : "development",
    server: {
      host: config.server.host,
      port: config.server.port,
    },
    features: [
      "TypeScript Support",
      "Canvas Rendering",
      "High Performance",
      "Type Safety",
      "Smart Intellisense",
    ],
  };
}

// 默认导出配置对象
export default config;
