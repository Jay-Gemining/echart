// 散点图示例文件
// 演示如何使用散点图API生成各种类型的散点图

const baseUrl = "http://localhost:3000";

// 示例数据
const examples = {
  // 1. 基础散点图
  basic: {
    title: "基础散点图示例",
    xAxisName: "X轴数据",
    yAxisName: "Y轴数据",
    series: [
      {
        name: "数据点",
        data: [
          { value: [10.0, 8.04] },
          { value: [8.0, 6.95] },
          { value: [13.0, 7.58] },
          { value: [9.0, 8.81] },
          { value: [11.0, 8.33] },
          { value: [14.0, 9.96] },
          { value: [6.0, 7.24] },
          { value: [4.0, 4.26] },
          { value: [12.0, 10.84] },
          { value: [7.0, 4.82] },
          { value: [5.0, 5.68] }
        ],
        symbolSize: 20
      }
    ]
  },

  // 2. 身高体重分布
  heightWeight: {
    title: "身高体重分布图",
    xAxisName: "身高 (cm)",
    yAxisName: "体重 (kg)",
    series: [
      {
        name: "男性",
        data: [
          { value: [175, 70] },
          { value: [180, 75] },
          { value: [165, 60] },
          { value: [190, 85] },
          { value: [170, 65] },
          { value: [185, 80] },
          { value: [178, 72] },
          { value: [172, 68] },
          { value: [183, 78] },
          { value: [168, 62] }
        ],
        symbolSize: 25
      },
      {
        name: "女性",
        data: [
          { value: [160, 50] },
          { value: [165, 55] },
          { value: [155, 45] },
          { value: [170, 60] },
          { value: [162, 52] },
          { value: [158, 48] },
          { value: [167, 58] },
          { value: [163, 53] },
          { value: [159, 49] },
          { value: [166, 57] }
        ],
        symbolSize: 25
      }
    ]
  },

  // 3. 销售数据分析
  sales: {
    title: "产品销售分析",
    xAxisName: "广告投入 (万元)",
    yAxisName: "销售额 (万元)",
    series: [
      {
        name: "产品A",
        data: [
          { value: [5, 12] },
          { value: [8, 18] },
          { value: [12, 25] },
          { value: [15, 32] },
          { value: [20, 35] },
          { value: [25, 45] },
          { value: [30, 52] },
          { value: [35, 58] }
        ],
        symbolSize: 20
      },
      {
        name: "产品B",
        data: [
          { value: [6, 10] },
          { value: [10, 15] },
          { value: [14, 22] },
          { value: [18, 28] },
          { value: [22, 33] },
          { value: [26, 38] },
          { value: [32, 44] },
          { value: [38, 50] }
        ],
        symbolSize: 20
      }
    ]
  },

  // 4. 考试成绩分析
  scores: {
    title: "学生考试成绩分析",
    xAxisName: "数学成绩",
    yAxisName: "英语成绩",
    series: [
      {
        name: "A班",
        data: [
          { value: [85, 90] },
          { value: [78, 82] },
          { value: [92, 88] },
          { value: [76, 79] },
          { value: [88, 85] },
          { value: [95, 92] },
          { value: [82, 86] },
          { value: [89, 91] }
        ],
        symbolSize: 18
      },
      {
        name: "B班",
        data: [
          { value: [75, 78] },
          { value: [68, 72] },
          { value: [82, 80] },
          { value: [79, 75] },
          { value: [86, 83] },
          { value: [73, 76] },
          { value: [91, 88] },
          { value: [84, 81] }
        ],
        symbolSize: 18
      }
    ]
  }
};

// 生成散点图配置
async function generateScatterChart(data, title) {
  try {
    console.log(`\n📊 生成${title}...`);

    const response = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const config = await response.json();
    console.log(`✅ ${title}配置生成成功`);
    return config;

  } catch (error) {
    console.error(`❌ ${title}生成失败:`, error.message);
    return null;
  }
}

// 生成PNG图像
async function generatePNG(data, filename, title) {
  try {
    console.log(`\n🖼️  生成${title}PNG图像...`);

    const response = await fetch(`${baseUrl}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType: "scatter",
        chartData: data,
        imageOptions: {
          width: 1000,
          height: 700,
          backgroundColor: "#ffffff"
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    // 保存文件
    if (typeof Bun !== "undefined") {
      await Bun.write(`test-output/${filename}`, buffer);
      console.log(`✅ ${title}PNG保存成功: test-output/${filename}`);
      console.log(`📏 文件大小: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    }

  } catch (error) {
    console.error(`❌ ${title}PNG生成失败:`, error.message);
  }
}

// 主函数
async function main() {
  console.log("🚀 散点图示例程序启动");
  console.log("📡 目标服务器:", baseUrl);
  console.log("=" * 50);

  // 检查服务器状态
  try {
    const healthResponse = await fetch(`${baseUrl}/health`);
    if (!healthResponse.ok) {
      throw new Error("服务器未响应");
    }
    const healthData = await healthResponse.json();
    console.log("✅ 服务器连接正常");
    console.log(`📊 服务器状态: ${healthData.status}`);
  } catch (error) {
    console.error("❌ 无法连接到服务器，请确保服务器正在运行");
    console.error("💡 启动命令: bun run start");
    return;
  }

  // 确保输出目录存在
  try {
    if (typeof Bun !== "undefined") {
      const fs = require("fs");
      if (!fs.existsSync("test-output")) {
        fs.mkdirSync("test-output", { recursive: true });
      }
    }
  } catch (error) {
    console.log("📁 无法创建输出目录，跳过PNG生成");
  }

  console.log("\n🎯 开始生成散点图示例...");

  // 1. 基础散点图
  await generateScatterChart(examples.basic, "基础散点图");
  await generatePNG(examples.basic, "scatter-basic.png", "基础散点图");

  // 2. 身高体重分布
  await generateScatterChart(examples.heightWeight, "身高体重分布图");
  await generatePNG(examples.heightWeight, "scatter-height-weight.png", "身高体重分布图");

  // 3. 销售数据分析
  await generateScatterChart(examples.sales, "销售数据分析");
  await generatePNG(examples.sales, "scatter-sales.png", "销售数据分析");

  // 4. 考试成绩分析
  await generateScatterChart(examples.scores, "考试成绩分析");
  await generatePNG(examples.scores, "scatter-scores.png", "考试成绩分析");

  console.log("\n🎉 所有散点图示例生成完成!");
  console.log("\n📊 生成的文件:");
  console.log("  - scatter-basic.png (基础散点图)");
  console.log("  - scatter-height-weight.png (身高体重分布)");
  console.log("  - scatter-sales.png (销售数据分析)");
  console.log("  - scatter-scores.png (考试成绩分析)");

  console.log("\n💡 使用提示:");
  console.log("  - 打开 http://localhost:3000 查看在线示例");
  console.log("  - 查看 test-output/ 目录下的PNG文件");
  console.log("  - 参考 docs/scatter-chart-guide.md 了解更多用法");
}

// curl命令示例
function showCurlExamples() {
  console.log("\n📋 curl命令示例:");

  console.log("\n1. 获取默认散点图配置:");
  console.log("curl http://localhost:3000/scatter");

  console.log("\n2. 生成自定义散点图:");
  console.log(`curl -X POST http://localhost:3000/scatter \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "测试散点图",
    "xAxisName": "X轴",
    "yAxisName": "Y轴",
    "series": [
      {
        "name": "数据",
        "data": [
          {"value": [10, 20]},
          {"value": [15, 25]},
          {"value": [20, 30]}
        ],
        "symbolSize": 20
      }
    ]
  }'`);

  console.log("\n3. 生成PNG图像:");
  console.log(`curl -X POST http://localhost:3000/png \\
  -H "Content-Type: application/json" \\
  -d '{
    "chartType": "scatter",
    "chartData": {
      "title": "散点图PNG",
      "xAxisName": "X轴",
      "yAxisName": "Y轴",
      "series": [
        {
          "name": "数据",
          "data": [{"value": [10, 20]}],
          "symbolSize": 25
        }
      ]
    },
    "imageOptions": {
      "width": 800,
      "height": 600
    }
  }' \\
  --output scatter.png`);
}

// 错误处理示例
async function showErrorHandling() {
  console.log("\n🚨 错误处理示例:");

  // 测试错误数据
  const invalidData = {
    title: "错误数据测试",
    series: [] // 空数组
  };

  try {
    const response = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidData),
    });

    const result = await response.json();
    console.log("📋 错误响应示例:", JSON.stringify(result, null, 2));

  } catch (error) {
    console.log("✅ 错误处理正常工作");
  }
}

// 如果直接运行此文件
if (typeof require !== "undefined" && require.main === module) {
  main()
    .then(() => {
      showCurlExamples();
      return showErrorHandling();
    })
    .catch(console.error);
}

// 导出供其他模块使用
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    examples,
    generateScatterChart,
    generatePNG,
    main
  };
}
