# 散点图使用指南

## 概述

散点图是一种用于显示两个连续变量之间关系的图表类型。在我们的ECharts服务器中，散点图支持多系列数据、自定义样式和高质量PNG输出。

## API端点

### 获取默认散点图配置
```http
GET /scatter
```

### 自定义散点图数据
```http
POST /scatter
Content-Type: application/json

{
  "title": "图表标题",
  "xAxisName": "X轴名称",
  "yAxisName": "Y轴名称",
  "series": [
    {
      "name": "系列名称",
      "data": [
        { "value": [x1, y1] },
        { "value": [x2, y2] }
      ],
      "symbolSize": 20
    }
  ]
}
```

## 数据格式

### 基础数据结构

```typescript
interface ScatterChartData {
  title?: string;           // 图表标题（可选）
  xAxisName?: string;       // X轴名称（可选）
  yAxisName?: string;       // Y轴名称（可选）
  series: ScatterSeriesData[];  // 系列数据数组
}

interface ScatterSeriesData {
  name: string;                    // 系列名称
  data: ScatterDataItem[];         // 数据点数组
  symbolSize?: number;             // 点的大小（可选）
}

interface ScatterDataItem {
  name?: string;                   // 数据点名称（可选）
  value: [number, number] | [number, number, number];  // [x, y] 或 [x, y, size]
}

// 注意：第三个参数 size 用于控制该点的显示大小
// 系统会自动将size值缩放到合适的显示范围（5-50像素）
```

## 使用示例

### 1. 基础散点图

```bash
curl -X POST http://localhost:3000/scatter \
  -H "Content-Type: application/json" \
  -d '{
    "title": "基础散点图",
    "xAxisName": "X轴",
    "yAxisName": "Y轴",
    "series": [
      {
        "name": "数据集1",
        "data": [
          { "value": [10, 20] },
          { "value": [15, 25] },
          { "value": [20, 30] },
          { "value": [25, 35] }
        ],
        "symbolSize": 15
      }
    ]
  }'
```

### 1.1. 每个点不同大小

```bash
curl -X POST http://localhost:3000/scatter \
  -H "Content-Type: application/json" \
  -d '{
    "title": "变大小散点图",
    "xAxisName": "X轴",
    "yAxisName": "Y轴",
    "series": [
      {
        "name": "不同大小点",
        "data": [
          { "value": [10, 20, 5] },   // 小点
          { "value": [15, 25, 15] },  // 中点
          { "value": [20, 30, 30] },  // 大点
          { "value": [25, 35, 45] }   // 很大点
        ]
      }
    ]
  }'
```

### 2. 多系列散点图

```bash
curl -X POST http://localhost:3000/scatter \
  -H "Content-Type: application/json" \
  -d '{
    "title": "身高体重分布",
    "xAxisName": "身高(cm)",
    "yAxisName": "体重(kg)",
    "series": [
      {
        "name": "男性",
        "data": [
          { "value": [175, 70] },
          { "value": [180, 75] },
          { "value": [165, 60] },
          { "value": [190, 85] }
        ],
        "symbolSize": 20
      },
      {
        "name": "女性",
        "data": [
          { "value": [160, 50] },
          { "value": [165, 55] },
          { "value": [155, 45] },
          { "value": [170, 60] }
        ],
        "symbolSize": 20
      }
    ]
  }'
```

### 3. PNG图像生成

```bash
curl -X POST http://localhost:3000/png \
  -H "Content-Type: application/json" \
  -d '{
    "chartType": "scatter",
    "chartData": {
      "title": "散点图示例",
      "xAxisName": "X轴",
      "yAxisName": "Y轴",
      "series": [
        {
          "name": "数据点",
          "data": [
            { "value": [10, 20] },
            { "value": [15, 25] },
            { "value": [20, 30] }
          ],
          "symbolSize": 25
        }
      ]
    },
    "imageOptions": {
      "width": 800,
      "height": 600,
      "backgroundColor": "#ffffff"
    }
  }' \
  --output scatter-chart.png
```

### 4. 气泡图效果（每个点不同大小）

```bash
curl -X POST http://localhost:3000/png \
  -H "Content-Type: application/json" \
  -d '{
    "chartType": "scatter",
    "chartData": {
      "title": "人口收入气泡图",
      "xAxisName": "人均收入(万元)",
      "yAxisName": "人口密度(人/km²)",
      "series": [
        {
          "name": "一线城市",
          "data": [
            { "value": [8, 2500, 100] },  // 北京，收入8万，密度2500，影响力100
            { "value": [7.5, 3800, 95] }, // 上海，收入7.5万，密度3800，影响力95
            { "value": [6.5, 1800, 80] }  // 深圳，收入6.5万，密度1800，影响力80
          ]
        },
        {
          "name": "二线城市",
          "data": [
            { "value": [4.5, 800, 45] },  // 杭州
            { "value": [4.2, 900, 40] },  // 南京
            { "value": [3.8, 700, 35] }   // 成都
          ]
        }
      ]
    },
    "imageOptions": {
      "width": 1000,
      "height": 700,
      "backgroundColor": "#f8f9fa"
    }
  }' \
  --output bubble-chart.png
```

## 配置选项

### 默认配置

系统提供以下默认配置：

- **默认标题**: "数据分布散点图"
- **默认点大小**: 20
- **默认颜色**: 使用系统预设的9种颜色
- **网格**: 左右边距3%和4%，底部边距3%
- **图例位置**: 顶部10%位置

### 自定义样式

#### 点大小设置
```json
{
  "series": [
    {
      "name": "数据",
      "data": [...],
      "symbolSize": 30  // 自定义点大小
    }
  ]
}
```

#### 三维数据（带大小）
```json
{
  "series": [
    {
      "name": "数据",
      "data": [
        { "value": [10, 20, 50] },  // [x, y, 点大小]
        { "value": [15, 25, 30] },  // 中等大小点
        { "value": [20, 30, 10] }   // 小点
      ]
    }
  ]
}
```

#### 动态大小缩放
系统会自动将第三个参数（size）缩放到5-50像素的显示范围：
- 最小size值 → 5像素
- 最大size值 → 50像素
- 中间值按比例缩放

#### 多系列独立缩放
每个系列的大小范围独立计算：
```json
{
  "series": [
    {
      "name": "A组",
      "data": [
        { "value": [10, 20, 100] },  // A组最大值
        { "value": [15, 25, 50] }    // A组中等值
      ]
    },
    {
      "name": "B组", 
      "data": [
        { "value": [20, 30, 20] },   // B组最大值
        { "value": [25, 35, 10] }    // B组最小值
      ]
    }
  ]
}
```

## 实际应用场景

### 1. 数据分析
- 展示两个变量之间的相关性
- 识别数据中的聚类模式
- 发现异常值和离群点
- **气泡图效果**：第三维度表示数据的重要性或影响力

### 2. 科学研究
- 实验数据可视化
- 测量结果展示
- 趋势分析
- **多维数据展示**：用点大小表示第三个变量

### 3. 商业应用
- 客户细分分析（用户价值 vs 活跃度 vs 消费能力）
- 产品性能比较（性能 vs 价格 vs 销量）
- 市场研究数据展示
- **风险评估**：风险等级用点大小表示

### 4. 地理信息
- 人口分布图（经纬度 vs 人口密度）
- 经济数据地图（位置 vs 经济指标 vs 影响范围）
- 销售区域分析（区域坐标 vs 销售额 vs 市场份额）

## 性能优化

### 大数据量处理
对于大量数据点（>1000个），建议：

1. **数据采样**: 使用代表性样本
2. **分批处理**: 分多个系列展示
3. **调整点大小**: 使用较小的symbolSize值

```json
{
  "series": [
    {
      "name": "大数据集",
      "data": [...],  // 大量数据
      "symbolSize": 5  // 较小的点
    }
  ]
}
```

### PNG生成优化
- 合理设置图像尺寸
- 选择合适的背景色
- 控制数据点数量

## 错误处理

常见错误及解决方案：

### 1. 数据格式错误
```json
// ❌ 错误
{ "value": [10] }  // 缺少y值

// ✅ 正确
{ "value": [10, 20] }
```

### 2. 系列数据缺失
```json
// ❌ 错误
{
  "title": "测试",
  "series": []  // 空数组
}

// ✅ 正确
{
  "title": "测试",
  "series": [
    {
      "name": "数据",
      "data": [{ "value": [1, 2] }]
    }
  ]
}
```

## 测试脚本

运行散点图测试：
```bash
# 基础散点图功能测试
bun run test-scatter

# 点大小功能专项测试
bun run test-scatter-size

# 散点图示例演示
bun run example-scatter
```

测试脚本会验证：
- 基础散点图生成
- 多系列数据处理
- **每个点不同大小功能**
- **三维数据处理**
- **气泡图效果**
- PNG图像输出
- 错误处理
- 性能测试

## 相关文档

- [API概览](../README.md)
- [PNG生成指南](./png-generation.md)
- [性能优化建议](./performance-guide.md)
- [错误处理说明](./error-handling.md)

## 版本历史

- **v2.0.0**: 初始散点图功能实现
  - 基础散点图支持
  - 多系列数据
  - PNG导出功能
  - TypeScript类型支持

- **v2.0.1**: 点大小功能增强
  - **每个点可设置不同大小**
  - **三维数据支持 [x, y, size]**
  - **自动大小缩放 (5-50像素)**
  - **多系列独立大小计算**
  - **气泡图效果实现**
  - **工具提示显示大小信息**
  - 专项测试套件