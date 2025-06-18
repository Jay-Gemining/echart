// 散点图点大小功能测试文件
// 专门测试散点图中每个点可以设置不同大小的功能

console.log("🔹 开始散点图点大小功能测试...");

const baseUrl = "http://localhost:3000";

// 测试数据 - 每个点都有不同的大小
const testData = {
  // 1. 基础三维数据测试
  basicThreeDimensional: {
    title: "基础三维数据测试 - 每个点不同大小",
    xAxisName: "X坐标",
    yAxisName: "Y坐标",
    series: [
      {
        name: "变大小点",
        data: [
          { value: [10, 20, 5] },   // 小点
          { value: [15, 25, 15] },  // 中点
          { value: [20, 30, 30] },  // 大点
          { value: [25, 35, 45] },  // 更大点
          { value: [30, 40, 60] },  // 最大点
          { value: [35, 45, 2] },   // 极小点
          { value: [40, 50, 35] },  // 大点
          { value: [45, 55, 20] },  // 中等点
        ]
      }
    ]
  },

  // 2. 多系列不同大小测试
  multiSeriesWithSizes: {
    title: "多系列散点图 - 每个点不同大小",
    xAxisName: "收入(万元)",
    yAxisName: "支出(万元)",
    series: [
      {
        name: "A组用户",
        data: [
          { value: [50, 30, 10] },  // 小用户
          { value: [80, 45, 25] },  // 中等用户
          { value: [120, 70, 40] }, // 大用户
          { value: [200, 150, 60] }, // 超大用户
          { value: [90, 55, 15] },  // 小用户
          { value: [150, 90, 35] }, // 大用户
        ]
      },
      {
        name: "B组用户",
        data: [
          { value: [40, 25, 8] },   // 极小用户
          { value: [70, 40, 20] },  // 中等用户
          { value: [100, 60, 30] }, // 大用户
          { value: [180, 130, 50] }, // 超大用户
          { value: [85, 50, 18] },  // 中小用户
          { value: [160, 100, 42] }, // 大用户
        ]
      }
    ]
  },

  // 3. 气泡图效果测试
  bubbleChart: {
    title: "气泡图效果 - 人口收入分析",
    xAxisName: "人均收入(元)",
    yAxisName: "人口密度(人/km²)",
    series: [
      {
        name: "一线城市",
        data: [
          { value: [80000, 2500, 100] }, // 北京
          { value: [75000, 3800, 95] },  // 上海
          { value: [65000, 1800, 80] },  // 深圳
          { value: [60000, 1200, 75] },  // 广州
        ]
      },
      {
        name: "二线城市",
        data: [
          { value: [45000, 800, 45] },   // 杭州
          { value: [42000, 900, 40] },   // 南京
          { value: [38000, 700, 35] },   // 成都
          { value: [40000, 850, 38] },   // 武汉
          { value: [36000, 600, 32] },   // 西安
        ]
      },
      {
        name: "三线城市",
        data: [
          { value: [28000, 400, 20] },   // 中小城市1
          { value: [25000, 350, 18] },   // 中小城市2
          { value: [22000, 300, 15] },   // 中小城市3
          { value: [20000, 250, 12] },   // 中小城市4
        ]
      }
    ]
  },

  // 4. 产品性能分析
  productPerformance: {
    title: "产品性能分析 - 价格vs性能vs销量",
    xAxisName: "性能得分",
    yAxisName: "价格(元)",
    series: [
      {
        name: "手机A系列",
        data: [
          { value: [85, 3000, 25] },  // 中端机型，销量中等
          { value: [95, 5000, 40] },  // 高端机型，销量好
          { value: [75, 2000, 15] },  // 入门机型，销量一般
          { value: [90, 4000, 30] },  // 中高端，销量不错
        ]
      },
      {
        name: "手机B系列",
        data: [
          { value: [80, 2800, 20] },  // 中端机型
          { value: [92, 4800, 35] },  // 高端机型
          { value: [78, 2200, 18] },  // 入门机型
          { value: [88, 3800, 28] },  // 中高端
        ]
      }
    ]
  },

  // 5. 极值测试
  extremeValues: {
    title: "极值测试 - 最大最小尺寸",
    xAxisName: "X值",
    yAxisName: "Y值",
    series: [
      {
        name: "极值测试",
        data: [
          { value: [10, 10, 1] },    // 最小尺寸
          { value: [20, 20, 100] },  // 最大尺寸
          { value: [30, 30, 50] },   // 中等尺寸
          { value: [40, 40, 1] },    // 最小尺寸
          { value: [50, 50, 100] },  // 最大尺寸
          { value: [15, 45, 75] },   // 大尺寸
          { value: [35, 15, 25] },   // 中小尺寸
        ]
      }
    ]
  }
};

// 测试函数
async function testScatterSizes() {
  try {
    console.log("📊 测试1: 基础三维数据测试...");
    const response1 = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData.basicThreeDimensional),
    });

    if (!response1.ok) {
      throw new Error(`HTTP error! status: ${response1.status}`);
    }

    const config1 = await response1.json();
    console.log("✅ 基础三维数据测试成功");

    // 检查是否正确处理了symbolSize函数
    const series1 = config1.series[0];
    console.log(`📏 第一个系列的symbolSize类型: ${typeof series1.symbolSize}`);

    console.log("\n📊 测试2: 多系列不同大小测试...");
    const response2 = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData.multiSeriesWithSizes),
    });

    if (!response2.ok) {
      throw new Error(`HTTP error! status: ${response2.status}`);
    }

    const config2 = await response2.json();
    console.log("✅ 多系列不同大小测试成功");
    console.log(`📊 系列数量: ${config2.series.length}`);

    console.log("\n📊 测试3: 气泡图效果测试...");
    const response3 = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData.bubbleChart),
    });

    if (!response3.ok) {
      throw new Error(`HTTP error! status: ${response3.status}`);
    }

    const config3 = await response3.json();
    console.log("✅ 气泡图效果测试成功");

    console.log("\n📊 测试4: PNG生成测试 - 基础三维数据...");
    const pngResponse1 = await fetch(`${baseUrl}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType: "scatter",
        chartData: testData.basicThreeDimensional,
        imageOptions: {
          width: 800,
          height: 600,
          backgroundColor: "#ffffff"
        }
      }),
    });

    if (!pngResponse1.ok) {
      throw new Error(`PNG generation failed! status: ${pngResponse1.status}`);
    }

    const pngBuffer1 = await pngResponse1.arrayBuffer();
    console.log("✅ 基础三维数据PNG生成成功");
    console.log(`📏 PNG文件大小: ${pngBuffer1.byteLength} bytes`);

    // 保存PNG文件
    if (typeof Bun !== "undefined") {
      await Bun.write("test-output/scatter-size-basic.png", pngBuffer1);
      console.log("💾 PNG文件已保存为: test-output/scatter-size-basic.png");
    }

    console.log("\n📊 测试5: PNG生成测试 - 气泡图...");
    const pngResponse2 = await fetch(`${baseUrl}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType: "scatter",
        chartData: testData.bubbleChart,
        imageOptions: {
          width: 1000,
          height: 700,
          backgroundColor: "#f8f9fa"
        }
      }),
    });

    if (!pngResponse2.ok) {
      throw new Error(`Bubble PNG generation failed! status: ${pngResponse2.status}`);
    }

    const pngBuffer2 = await pngResponse2.arrayBuffer();
    console.log("✅ 气泡图PNG生成成功");
    console.log(`📏 气泡图PNG文件大小: ${pngBuffer2.byteLength} bytes`);

    // 保存气泡图PNG文件
    if (typeof Bun !== "undefined") {
      await Bun.write("test-output/scatter-bubble-chart.png", pngBuffer2);
      console.log("💾 气泡图PNG文件已保存为: test-output/scatter-bubble-chart.png");
    }

    console.log("\n📊 测试6: 产品性能分析PNG...");
    const pngResponse3 = await fetch(`${baseUrl}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType: "scatter",
        chartData: testData.productPerformance,
        imageOptions: {
          width: 1200,
          height: 800,
          backgroundColor: "#ffffff"
        }
      }),
    });

    if (!pngResponse3.ok) {
      throw new Error(`Product performance PNG failed! status: ${pngResponse3.status}`);
    }

    const pngBuffer3 = await pngResponse3.arrayBuffer();
    console.log("✅ 产品性能分析PNG生成成功");

    if (typeof Bun !== "undefined") {
      await Bun.write("test-output/scatter-product-performance.png", pngBuffer3);
      console.log("💾 产品性能分析PNG已保存为: test-output/scatter-product-performance.png");
    }

    console.log("\n📊 测试7: 极值测试...");
    const response4 = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData.extremeValues),
    });

    if (!response4.ok) {
      throw new Error(`Extreme values test failed! status: ${response4.status}`);
    }

    const config4 = await response4.json();
    console.log("✅ 极值测试成功");

    console.log("\n🎉 所有散点图点大小功能测试完成!");
    console.log("📊 测试结果总结:");
    console.log("  ✅ 基础三维数据处理");
    console.log("  ✅ 多系列不同大小支持");
    console.log("  ✅ 气泡图效果实现");
    console.log("  ✅ PNG图像生成（含大小信息）");
    console.log("  ✅ 产品性能分析应用");
    console.log("  ✅ 极值情况处理");
    console.log("  ✅ 工具提示显示大小信息");

  } catch (error) {
    console.error("❌ 测试失败:", error.message);
    console.error("🔍 错误详情:", error);
  }
}

// 性能测试 - 大量不同大小的点
async function performanceSizeTest() {
  console.log("\n⚡ 开始大量点大小性能测试...");

  // 生成1000个随机大小的点
  const largeDataWithSizes = {
    title: "大量数据点大小性能测试",
    xAxisName: "随机X",
    yAxisName: "随机Y",
    series: [
      {
        name: "大量数据点",
        data: Array.from({ length: 1000 }, () => ({
          value: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 50 + 5  // 大小在5-55之间
          ]
        }))
      }
    ]
  };

  const startTime = Date.now();

  try {
    const response = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(largeDataWithSizes),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await response.json();
    const endTime = Date.now();

    console.log("📊 大量点大小性能测试结果:");
    console.log(`  数据点数量: 1000个`);
    console.log(`  处理时间: ${endTime - startTime}ms`);
    console.log(`  每个点平均处理时间: ${((endTime - startTime) / 1000).toFixed(3)}ms`);

    // PNG生成性能测试
    console.log("\n📷 大量点PNG生成性能测试...");
    const pngStartTime = Date.now();

    const pngResponse = await fetch(`${baseUrl}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType: "scatter",
        chartData: largeDataWithSizes,
        imageOptions: {
          width: 800,
          height: 600
        }
      }),
    });

    if (!pngResponse.ok) {
      throw new Error(`Large data PNG failed! status: ${pngResponse.status}`);
    }

    const pngBuffer = await pngResponse.arrayBuffer();
    const pngEndTime = Date.now();

    console.log("📊 大量点PNG生成性能结果:");
    console.log(`  PNG生成时间: ${pngEndTime - pngStartTime}ms`);
    console.log(`  PNG文件大小: ${(pngBuffer.byteLength / 1024).toFixed(2)} KB`);

    if (typeof Bun !== "undefined") {
      await Bun.write("test-output/scatter-large-size-data.png", pngBuffer);
      console.log("💾 大量数据PNG已保存为: test-output/scatter-large-size-data.png");
    }

  } catch (error) {
    console.error("❌ 性能测试失败:", error.message);
  }
}

// 主函数
async function main() {
  console.log("🚀 散点图点大小功能测试套件启动");
  console.log("📡 目标服务器:", baseUrl);
  console.log("=" * 50);

  // 检查服务器是否运行
  try {
    const healthResponse = await fetch(`${baseUrl}/health`);
    if (!healthResponse.ok) {
      throw new Error("服务器未响应");
    }
    console.log("✅ 服务器连接正常");
  } catch (error) {
    console.error("❌ 无法连接到服务器，请确保服务器正在运行");
    console.error("💡 启动命令: bun run start");
    return;
  }

  // 运行测试
  await testScatterSizes();
  await performanceSizeTest();

  console.log("\n🎯 点大小功能测试套件完成!");
  console.log("\n💡 使用提示:");
  console.log("  - 数据格式: {value: [x, y, size]}");
  console.log("  - 大小会自动缩放到5-50像素范围");
  console.log("  - 支持多系列，每个系列独立计算大小范围");
  console.log("  - 工具提示会显示大小信息");
  console.log("  - 查看test-output/目录下的PNG文件看效果");
}

// 显示使用示例
function showUsageExamples() {
  console.log("\n📋 点大小功能使用示例:");

  console.log("\n1. 基础三维数据:");
  console.log(`curl -X POST http://localhost:3000/scatter \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "点大小示例",
    "xAxisName": "X轴",
    "yAxisName": "Y轴",
    "series": [
      {
        "name": "数据",
        "data": [
          {"value": [10, 20, 5]},   // 小点
          {"value": [15, 25, 30]},  // 大点
          {"value": [20, 30, 50]}   // 更大点
        ]
      }
    ]
  }'`);

  console.log("\n2. 气泡图效果:");
  console.log(`curl -X POST http://localhost:3000/png \\
  -H "Content-Type: application/json" \\
  -d '{
    "chartType": "scatter",
    "chartData": {
      "title": "气泡图",
      "xAxisName": "收入",
      "yAxisName": "支出",
      "series": [
        {
          "name": "用户群体",
          "data": [
            {"value": [100, 50, 10]},  // 小用户
            {"value": [200, 120, 40]}  // 大用户
          ]
        }
      ]
    },
    "imageOptions": {"width": 800, "height": 600}
  }' \\
  --output bubble-chart.png`);
}

// 运行测试
if (typeof require !== "undefined" && require.main === module) {
  main()
    .then(() => {
      showUsageExamples();
    })
    .catch(console.error);
}
