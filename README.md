# 📊 ECharts 可视化服务器

一个基于 Bun 的 HTTP 服务器，提供 ECharts 图表可视化功能，支持多种图表类型和自定义数据输入。

## ✨ 功能特性

- 🚀 **高性能**: 使用 Bun 运行时，启动速度快
- 📊 **多图表类型**: 支持折线图、直方图、饼图、地图四种图表
- 🎨 **美观界面**: 提供响应式 Web 界面展示所有图表
- 🔧 **RESTful API**: 完整的 GET/POST API 支持
- 📱 **响应式设计**: 支持移动端访问
- 🗺️ **智能地名映射**: 支持中国省份简称自动转换
- 🖼️ **PNG图像生成**: 支持将图表数据转换为PNG图像下载

## 🚀 快速开始

### 安装依赖

```bash
bun install
```

### 启动服务器

```bash
# 推荐: 带检查的启动方式
bun run start-check

# 普通启动
bun start

# 开发模式（热重载）
bun run dev
```

服务器将在 `http://localhost:3000` 启动。

### 重要提示

确保 `data/china.json` 文件存在，用于地图图表渲染。如果没有此文件，地图功能将无法正常工作。

## 📁 项目结构

```
echart/
├── src/                  # 源代码
│   └── server.js         # 主服务器文件
├── data/                 # 数据文件
│   └── china.json        # 中国地图GeoJSON数据
├── public/               # 静态文件
│   ├── map-test.html     # 地图测试页面
│   └── png-demo.html     # PNG功能演示页面
├── tests/                # 测试文件
│   ├── examples.js       # API使用示例
│   └── test-fixes.js     # 修复测试脚本
├── scripts/              # 脚本文件
│   └── start.js          # 启动检查脚本
├── docs/                 # 文档
│   └── README.md         # 详细文档
├── package.json          # 项目配置
└── README.md             # 项目说明
```

## 📊 支持的图表类型

### 1. 📈 折线图 (Line Chart)
- 展示趋势数据，支持多系列
- 自动调整图例位置，避免覆盖

### 2. 📊 直方图 (Histogram)
- 展示数据分布和频率统计
- 支持自定义分类和数值

### 3. 🥧 饼图 (Pie Chart)
- 展示占比数据和分类统计
- 支持自定义颜色和标签

### 4. 🗺️ 地图 (Map Chart)
- 展示中国各省份地理数据分布
- 智能地名映射，支持简称输入

### 5. 🖼️ PNG图像生成
- 将任意图表数据转换为PNG图像
- 支持自定义图像尺寸和背景色
- 提供Web界面和API两种方式

## 🌐 API 端点

### 主页面
- **GET /** - 展示所有图表的 Web 界面

### GET 端点（默认数据）
- **GET /line** - 获取默认折线图配置
- **GET /histogram** - 获取默认直方图配置
- **GET /pie** - 获取默认饼图配置
- **GET /map** - 获取默认地图配置
- **GET /china.json** - 获取中国地图GeoJSON数据

### POST 端点（自定义数据）
- **POST /line** - 使用自定义数据创建折线图
- **POST /histogram** - 使用自定义数据创建直方图
- **POST /pie** - 使用自定义数据创建饼图
- **POST /map** - 使用自定义数据创建地图
- **POST /png** - 生成PNG图像文件

## 🧪 测试和验证

### 运行测试
```bash
# 运行所有测试
bun run test-fixes

# 测试特定功能
bun run test-fixes --legend   # 折线图legend修复
bun run test-fixes --map      # 地图数据加载
bun run test-fixes --mapping  # 地名映射功能
bun run test-fixes --edge     # 边界情况

# API使用示例
bun run test

# PNG功能测试
bun run test-png
```

### 可视化测试
- 访问 `public/map-test.html` 进行地图功能测试
- 访问 `public/png-demo.html` 进行PNG功能演示
- 在线验证地名映射和数据匹配

## 🔧 使用示例

### 获取默认图表
```bash
curl http://localhost:3000/line
```

### 创建自定义折线图
```bash
curl -X POST http://localhost:3000/line \
  -H "Content-Type: application/json" \
  -d '{
    "title": "销售趋势",
    "categories": ["Q1", "Q2", "Q3", "Q4"],
    "series": [
      {"name": "2023", "data": [100, 120, 140, 160]},
      {"name": "2024", "data": [110, 130, 150, 180]}
    ]
  }'
```

### 创建地图（支持简称）
```bash
curl -X POST http://localhost:3000/map \
  -H "Content-Type: application/json" \
  -d '{
    "title": "用户分布",
    "data": [
      {"name": "北京", "value": 1000},
      {"name": "广东", "value": 2000},
      {"name": "新疆", "value": 500}
    ]
  }'
```

### 生成PNG图像
```bash
curl -X POST http://localhost:3000/png \
  -H "Content-Type: application/json" \
  -d '{
    "chartType": "line",
    "chartData": {
      "title": "销售趋势",
      "categories": ["Q1", "Q2", "Q3", "Q4"],
      "series": [
        {"name": "2023", "data": [100, 120, 140, 160]}
      ]
    },
    "imageOptions": {
      "width": 800,
      "height": 600,
      "backgroundColor": "#ffffff"
    }
  }' \
  --output chart.png
```

## 🛠️ 技术栈

- **运行时**: Bun
- **图表库**: ECharts 5.6.0
- **HTTP 服务**: Bun 内置服务器
- **前端**: 原生 HTML/CSS/JavaScript
- **图像处理**: JSDOM + Sharp (SVG转PNG)

## 🔍 故障排除

### 地图不显示
1. 确认 `data/china.json` 文件存在
2. 检查浏览器控制台网络错误
3. 验证 `/china.json` 端点返回有效数据

### 地图数据不显示
1. 检查地名格式（支持简称自动转换）
2. 使用 `public/map-test.html` 验证地名映射
3. 确认数据值为有效数字

### 折线图legend覆盖
1. 系统已自动处理多系列情况
2. 4个或更多系列时会自动调整布局

### PNG生成失败
1. 检查图表数据格式是否正确
2. 确认图像尺寸在允许范围内（200-2000px）
3. 验证服务器有足够内存处理图像生成

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

📚 **详细文档**: 查看 `docs/README.md` 获取完整的API文档和使用说明。
