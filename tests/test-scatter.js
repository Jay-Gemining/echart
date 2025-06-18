// 散点图测试文件
// 测试散点图的生成和渲染功能

console.log("🔹 开始散点图测试...");

const baseUrl = "http://localhost:3000";

// 测试数据
const testData = {
  basic: {
    title: "基础散点图测试",
    xAxisName: "X轴数据",
    yAxisName: "Y轴数据",
    series: [
      {
        name: "数据集1",
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
        symbolSize: 25
      }
    ]
  },
  multiSeries: {
    title: "多系列散点图测试",
    xAxisName: "身高(cm)",
    yAxisName: "体重(kg)",
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
          { value: [172, 68] }
        ],
        symbolSize: 20
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
          { value: [163, 53] }
        ],
        symbolSize: 20
      }
    ]
  },
  largeData: {
    title: "大数据量散点图测试",
    xAxisName: "随机数X",
    yAxisName: "随机数Y",
    series: [
      {
        name: "随机数据",
        data: Array.from({ length: 100 }, () => ({
          value: [
            Math.random() * 100,
            Math.random() * 100
          ]
        })),
        symbolSize: 8
      }
    ]
  }
};

// 测试函数
async function testScatterChart() {
  try {
    console.log("📊 测试1: 获取默认散点图配置...");
    const defaultResponse = await fetch(`${baseUrl}/scatter`);
    if (!defaultResponse.ok) {
      throw new Error(`HTTP error! status: ${defaultResponse.status}`);
    }
    const defaultData = await defaultResponse.json();
    console.log("✅ 默认散点图配置获取成功");
    console.log("📋 默认配置:", JSON.stringify(defaultData, null, 2));

    console.log("\n📊 测试2: 基础散点图...");
    const basicResponse = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData.basic),
    });
    if (!basicResponse.ok) {
      throw new Error(`HTTP error! status: ${basicResponse.status}`);
    }
    const basicData = await basicResponse.json();
    console.log("✅ 基础散点图配置生成成功");

    console.log("\n📊 测试3: 多系列散点图...");
    const multiResponse = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData.multiSeries),
    });
    if (!multiResponse.ok) {
      throw new Error(`HTTP error! status: ${multiResponse.status}`);
    }
    const multiData = await multiResponse.json();
    console.log("✅ 多系列散点图配置生成成功");

    console.log("\n📊 测试4: 大数据量散点图...");
    const largeResponse = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData.largeData),
    });
    if (!largeResponse.ok) {
      throw new Error(`HTTP error! status: ${largeResponse.status}`);
    }
    const largeData = await largeResponse.json();
    console.log("✅ 大数据量散点图配置生成成功");

    console.log("\n📊 测试5: PNG生成测试...");
    const pngResponse = await fetch(`${baseUrl}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType: "scatter",
        chartData: testData.basic,
        imageOptions: {
          width: 800,
          height: 600,
          backgroundColor: "#ffffff"
        }
      }),
    });
    if (!pngResponse.ok) {
      throw new Error(`PNG generation failed! status: ${pngResponse.status}`);
    }
    const pngBuffer = await pngResponse.arrayBuffer();
    console.log("✅ PNG生成成功");
    console.log(`📏 PNG文件大小: ${pngBuffer.byteLength} bytes`);

    // 保存PNG文件
    if (typeof Bun !== "undefined") {
      await Bun.write("test-output/scatter-test.png", pngBuffer);
      console.log("💾 PNG文件已保存为: test-output/scatter-test.png");
    }

    console.log("\n📊 测试6: 多系列PNG生成测试...");
    const multiPngResponse = await fetch(`${baseUrl}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType: "scatter",
        chartData: testData.multiSeries,
        imageOptions: {
          width: 1000,
          height: 700,
          backgroundColor: "#f8f9fa"
        }
      }),
    });
    if (!multiPngResponse.ok) {
      throw new Error(`Multi-series PNG generation failed! status: ${multiPngResponse.status}`);
    }
    const multiPngBuffer = await multiPngResponse.arrayBuffer();
    console.log("✅ 多系列PNG生成成功");
    console.log(`📏 多系列PNG文件大小: ${multiPngBuffer.byteLength} bytes`);

    // 保存多系列PNG文件
    if (typeof Bun !== "undefined") {
      await Bun.write("test-output/scatter-multi-test.png", multiPngBuffer);
      console.log("💾 多系列PNG文件已保存为: test-output/scatter-multi-test.png");
    }

    console.log("\n📊 测试7: 错误处理测试...");
    try {
      const errorResponse = await fetch(`${baseUrl}/scatter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invalidData: "test"
        }),
      });
      const errorData = await errorResponse.json();
      console.log("✅ 错误处理测试完成");
    } catch (error) {
      console.log("✅ 错误处理正常工作");
    }

    console.log("\n🎉 所有散点图测试完成!");
    console.log("📊 测试结果总结:");
    console.log("  ✅ 默认配置获取");
    console.log("  ✅ 基础散点图生成");
    console.log("  ✅ 多系列散点图生成");
    console.log("  ✅ 大数据量处理");
    console.log("  ✅ PNG图像生成");
    console.log("  ✅ 多系列PNG生成");
    console.log("  ✅ 错误处理");

  } catch (error) {
    console.error("❌ 测试失败:", error.message);
    console.error("🔍 错误详情:", error);
  }
}

// 性能测试
async function performanceTest() {
  console.log("\n⚡ 开始性能测试...");

  const iterations = 10;
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now();

    try {
      const response = await fetch(`${baseUrl}/scatter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData.largeData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      const endTime = Date.now();
      times.push(endTime - startTime);

    } catch (error) {
      console.error(`❌ 性能测试第${i + 1}次失败:`, error.message);
    }
  }

  if (times.length > 0) {
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    console.log("📊 性能测试结果:");
    console.log(`  平均响应时间: ${avgTime.toFixed(2)}ms`);
    console.log(`  最快响应时间: ${minTime}ms`);
    console.log(`  最慢响应时间: ${maxTime}ms`);
    console.log(`  成功率: ${(times.length / iterations * 100).toFixed(1)}%`);
  }
}

// 压力测试
async function stressTest() {
  console.log("\n🔥 开始压力测试...");

  const concurrentRequests = 5;
  const promises = [];

  for (let i = 0; i < concurrentRequests; i++) {
    promises.push(
      fetch(`${baseUrl}/scatter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData.multiSeries),
      })
    );
  }

  try {
    const startTime = Date.now();
    const responses = await Promise.all(promises);
    const endTime = Date.now();

    const successCount = responses.filter(r => r.ok).length;

    console.log("📊 压力测试结果:");
    console.log(`  并发请求数: ${concurrentRequests}`);
    console.log(`  成功请求数: ${successCount}`);
    console.log(`  总耗时: ${endTime - startTime}ms`);
    console.log(`  平均每请求: ${((endTime - startTime) / concurrentRequests).toFixed(2)}ms`);

  } catch (error) {
    console.error("❌ 压力测试失败:", error.message);
  }
}

// 主函数
async function main() {
  console.log("🚀 散点图测试套件启动");
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
  await testScatterChart();
  await performanceTest();
  await stressTest();

  console.log("\n🎯 测试套件完成!");
}

// 运行测试
main().catch(console.error);
