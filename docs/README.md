# ECharts 可视化服务器

一个基于 Bun 的 HTTP 服务器，提供 ECharts 图表可视化功能。

## 功能特性

- 🚀 使用 Bun 运行时，启动速度快
- 📊 提供 4 种图表类型的 API 端点
- 🎨 美观的 Web 界面展示所有图表
- 🔧 RESTful API 设计
- 📱 响应式设计，支持移动端

## 支持的图表类型

1. **折线图 (Line Chart)** - 展示趋势数据，支持多系列数据
2. **直方图 (Histogram)** - 展示数据分布和频率统计
3. **饼图 (Pie Chart)** - 展示占比数据和分类统计
4. **地图 (Map Chart)** - 展示地理数据分布

所有图表类型都支持：
- 🔄 **GET请求** - 获取带有示例数据的默认图表
- 📊 **POST请求** - 使用自定义数据创建个性化图表

## 快速开始

### 安装依赖

```bash
bun install
```

### 启动服务器

```bash
# 普通启动
bun start

# 开发模式（热重载）
bun run dev
```

服务器将在 `http://localhost:3000` 启动。

### 重要提示

确保项目根目录下有 `china.json` 文件（中国地图的GeoJSON数据），用于地图图表渲染。如果没有此文件，地图功能将无法正常工作。

## API 端点

### 主页面
- **GET /** - 展示所有图表的 Web 界面

### 图表配置 API

#### GET 端点（默认数据）
- **GET /line** - 获取默认折线图配置
- **GET /histogram** - 获取默认直方图配置  
- **GET /pie** - 获取默认饼图配置
- **GET /map** - 获取默认地图配置
- **GET /china.json** - 获取中国地图GeoJSON数据

#### POST 端点（自定义数据）
- **POST /line** - 使用自定义数据创建折线图
- **POST /histogram** - 使用自定义数据创建直方图
- **POST /pie** - 使用自定义数据创建饼图
- **POST /map** - 使用自定义数据创建地图

### 响应格式

所有图表 API 返回标准的 ECharts 配置对象：

```json
{
  "title": {
    "text": "图表标题"
  },
  "xAxis": {...},
  "yAxis": {...},
  "series": [...]
}
```

## 使用示例

### 获取折线图配置

```bash
curl http://localhost:3000/line
```

### 在前端使用

#### 获取默认图表
```javascript
// 获取默认图表配置
const response = await fetch('http://localhost:3000/line');
const chartConfig = await response.json();

// 初始化 ECharts
const chart = echarts.init(document.getElementById('chart'));
chart.setOption(chartConfig);
```

#### 使用自定义数据
```javascript
// 自定义数据
const customData = {
  title: "我的销售数据",
  categories: ["1月", "2月", "3月", "4月"],
  series: [
    {
      name: "产品A",
      data: [120, 132, 101, 134]
    },
    {
      name: "产品B", 
      data: [220, 182, 191, 234]
    }
  ]
};

// 发送POST请求
const response = await fetch('http://localhost:3000/line', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(customData)
});

const chartConfig = await response.json();
const chart = echarts.init(document.getElementById('chart'));
chart.setOption(chartConfig);
```

## 项目结构

```
echart/
├── package.json          # 项目配置
├── server.js             # 主服务器文件
├── examples.js           # API使用示例
├── test-fixes.js         # 修复测试脚本
├── map-test.html         # 地图测试页面
├── china.json            # 中国地图GeoJSON数据
└── README.md             # 项目说明
```

## 技术栈

- **运行时**: Bun
- **图表库**: ECharts 5.6.0
- **HTTP 服务**: Bun 内置服务器
- **前端**: 原生 HTML/CSS/JavaScript

## 自定义图表

你可以修改 `server.js` 中的配置函数来自定义图表：

- `getLineChartConfig()` - 折线图配置
- `getHistogramConfig()` - 直方图配置
- `getPieChartConfig()` - 饼图配置
- `getMapChartConfig()` - 地图配置

## 特性说明

### CORS 支持
服务器已配置 CORS 头，支持跨域请求。

### 响应式设计
Web 界面采用 CSS Grid 布局，自动适应不同屏幕尺寸。

### 数据示例
所有图表都包含示例数据，可直接查看效果。

### 问题修复

#### 1. 折线图Legend覆盖问题
- **问题**: 当折线图包含多个系列时，图例(legend)会覆盖图表区域
- **解决方案**: 动态调整grid.top和legend.top值
  - 少于4个系列：grid.top = 20%, legend.top = 10%
  - 4个或更多系列：grid.top = 25%, legend.top = 15%

#### 2. 地图无法显示问题  
### 地图无法显示问题  
- **问题**: 地图图表无法正常渲染，因为缺少地图数据
- **解决方案**: 
  - 添加中国地图GeoJSON数据文件 (`china.json`)
  - 在前端初始化时通过 `echarts.registerMap('china', chinaMapData)` 注册地图数据
  - 提供 `/china.json` 端点用于获取地图数据

#### 3. 地图数据匹配问题
- **问题**: 地图数据没有正确绘制在图中，因为数据中的地名与GeoJSON中的地名不匹配
- **解决方案**:
  - 创建地名映射表，支持简称到完整地名的自动转换
  - 标准化数据中的地名格式，确保与GeoJSON中的名称完全匹配
  - 例如："北京" → "北京市"，"广东" → "广东省"，"新疆" → "新疆维吾尔自治区"

## 数据格式说明

### 折线图 (Line Chart)
```json
{
  "title": "图表标题",
  "categories": ["1月", "2月", "3月", "4月"],
  "yAxisName": "Y轴名称",
  "series": [
    {
      "name": "系列名称",
      "data": [120, 132, 101, 134]
    }
  ]
}
```

### 直方图 (Histogram)
```json
{
  "title": "图表标题",
  "categories": ["类别1", "类别2", "类别3"],
  "data": [320, 480, 650],
  "xAxisName": "X轴名称",
  "yAxisName": "Y轴名称",
  "seriesName": "系列名称"
}
```

### 饼图 (Pie Chart)
```json
{
  "title": "图表标题", 
  "seriesName": "系列名称",
  "data": [
    {"name": "类别A", "value": 335, "color": "#5470c6"},
    {"name": "类别B", "value": 310, "color": "#91cc75"}
  ]
}
```

### 地图 (Map Chart)
```json
{
  "title": "图表标题",
  "seriesName": "系列名称",
  "tooltipFormatter": "{b}<br/>{c} 万元",
  "data": [
    {"name": "北京", "value": 890},
    {"name": "上海", "value": 823}
  ],
  "colors": ["#e0ffff", "#006edd"]
}
```

**注意**: 地名支持简称自动转换，如：
- "北京" → "北京市"
- "广东" → "广东省"  
- "新疆" → "新疆维吾尔自治区"
- "内蒙古" → "内蒙古自治区"

## 测试和示例

### 运行测试脚本
```bash
# 运行API测试
bun run examples.js

# 查看CURL命令示例
bun run examples.js --curl

# 运行修复测试
bun run test-fixes.js

# 测试特定功能
bun run test-fixes.js --legend  # 测试折线图legend修复
bun run test-fixes.js --map     # 测试地图数据加载
bun run test-fixes.js --mapping # 测试地名映射功能
bun run test-fixes.js --edge    # 测试边界情况
```

### CURL 示例
```bash
# 获取默认折线图
curl http://localhost:3000/line

# 使用自定义数据创建折线图
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

## Web界面功能

访问 `http://localhost:3000` 可以：

- 📊 查看所有图表的实时预览
- ✏️ 在线编辑图表数据
- 🔄 实时更新图表显示
- 📱 响应式设计，支持移动端
- 🗺️ 完整的中国地图显示（已修复）
- 📈 多系列折线图正确显示（已修复legend覆盖问题）

### 地图测试页面

访问 `map-test.html` 文件可以：

- 🧪 测试地图数据是否正确绘制
- 🔍 验证地名映射功能
- 📋 查看完整的地名对照表
- ✅ 检查GeoJSON数据完整性
- 🗺️ 对比默认地图和自定义地图效果

## 故障排除

### 地图不显示
1. 确认 `china.json` 文件存在于项目根目录
2. 检查浏览器控制台是否有网络错误
3. 验证 `/china.json` 端点是否返回有效数据

### 地图数据不显示
1. 检查地名格式是否正确（支持简称自动转换）
2. 使用 `map-test.html` 页面验证地名映射
3. 确认数据值不为空或负数

### 折线图legend覆盖
1. 检查系列数量是否超过3个
2. 确认grid.top是否根据系列数量动态调整
3. 可以手动调整legend和grid的top值

## 许可证

MIT License