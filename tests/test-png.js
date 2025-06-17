// PNG图像生成功能测试文件
// 运行前请确保服务器已启动: bun run src/server.js

const BASE_URL = "http://localhost:3000";
const fs = require("fs");
const path = require("path");

// 创建测试输出目录
const outputDir = "test-output";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 测试PNG端点信息
async function testPNGEndpointInfo() {
  console.log("🔄 测试PNG端点信息...");

  try {
    const response = await fetch(`${BASE_URL}/png`);
    const info = await response.json();

    console.log("✅ PNG端点信息获取成功");
    console.log("📋 端点说明:", info.message);
    console.log("📝 请求方法:", info.method);
    console.log("🔧 参数说明:", JSON.stringify(info.parameters, null, 2));
  } catch (error) {
    console.error("❌ PNG端点信息测试失败:", error.message);
  }
}

// 测试折线图PNG生成
async function testLineChartPNG() {
  console.log("🔄 测试折线图PNG生成...");

  const testData = {
    chartType: "line",
    chartData: {
      title: "测试折线图PNG",
      categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
      yAxisName: "销售额 (万元)",
      series: [
        {
          name: "产品A",
          data: [150, 180, 120, 200, 160, 240],
        },
        {
          name: "产品B",
          data: [100, 140, 180, 160, 200, 180],
        },
        {
          name: "产品C",
          data: [80, 120, 140, 120, 100, 160],
        },
      ],
    },
    imageOptions: {
      width: 900,
      height: 600,
      backgroundColor: "#f8f9fa",
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const filename = path.join(outputDir, "test-line-chart.png");
    fs.writeFileSync(filename, Buffer.from(buffer));

    console.log("✅ 折线图PNG生成成功");
    console.log(`📁 文件保存至: ${filename}`);
    console.log(`📊 图像大小: ${buffer.byteLength} bytes`);
  } catch (error) {
    console.error("❌ 折线图PNG生成失败:", error.message);
  }
}

// 测试直方图PNG生成
async function testHistogramPNG() {
  console.log("🔄 测试直方图PNG生成...");

  const testData = {
    chartType: "histogram",
    chartData: {
      title: "测试直方图PNG",
      categories: ["优秀", "良好", "中等", "及格", "不及格"],
      data: [45, 38, 25, 15, 7],
      xAxisName: "成绩等级",
      yAxisName: "学生人数",
      seriesName: "成绩分布",
    },
    imageOptions: {
      width: 800,
      height: 500,
      backgroundColor: "#ffffff",
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const filename = path.join(outputDir, "test-histogram.png");
    fs.writeFileSync(filename, Buffer.from(buffer));

    console.log("✅ 直方图PNG生成成功");
    console.log(`📁 文件保存至: ${filename}`);
    console.log(`📊 图像大小: ${buffer.byteLength} bytes`);
  } catch (error) {
    console.error("❌ 直方图PNG生成失败:", error.message);
  }
}

// 测试饼图PNG生成
async function testPieChartPNG() {
  console.log("🔄 测试饼图PNG生成...");

  const testData = {
    chartType: "pie",
    chartData: {
      title: "测试饼图PNG",
      seriesName: "市场份额",
      data: [
        { name: "产品A", value: 35, color: "#5470c6" },
        { name: "产品B", value: 25, color: "#91cc75" },
        { name: "产品C", value: 20, color: "#fac858" },
        { name: "产品D", value: 15, color: "#ee6666" },
        { name: "其他", value: 5, color: "#73c0de" },
      ],
    },
    imageOptions: {
      width: 700,
      height: 700,
      backgroundColor: "#f5f5f5",
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const filename = path.join(outputDir, "test-pie-chart.png");
    fs.writeFileSync(filename, Buffer.from(buffer));

    console.log("✅ 饼图PNG生成成功");
    console.log(`📁 文件保存至: ${filename}`);
    console.log(`📊 图像大小: ${buffer.byteLength} bytes`);
  } catch (error) {
    console.error("❌ 饼图PNG生成失败:", error.message);
  }
}

// 测试地图PNG生成
async function testMapPNG() {
  console.log("🔄 测试地图PNG生成...");

  const testData = {
    chartType: "map",
    chartData: {
      title: "测试地图PNG",
      seriesName: "用户分布",
      tooltipFormatter: "{b}<br/>用户数: {c}人",
      data: [
        { name: "北京", value: 1200 },
        { name: "上海", value: 980 },
        { name: "广东", value: 1500 },
        { name: "江苏", value: 800 },
        { name: "浙江", value: 750 },
        { name: "山东", value: 650 },
        { name: "四川", value: 500 },
        { name: "湖北", value: 400 },
      ],
      colors: ["#e6f3ff", "#0ea5e9"],
    },
    imageOptions: {
      width: 1000,
      height: 800,
      backgroundColor: "#ffffff",
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const filename = path.join(outputDir, "test-map.png");
    fs.writeFileSync(filename, Buffer.from(buffer));

    console.log("✅ 地图PNG生成成功");
    console.log(`📁 文件保存至: ${filename}`);
    console.log(`📊 图像大小: ${buffer.byteLength} bytes`);
  } catch (error) {
    console.error("❌ 地图PNG生成失败:", error.message);
  }
}

// 测试不同尺寸的图像生成
async function testDifferentSizes() {
  console.log("🔄 测试不同尺寸图像生成...");

  const sizes = [
    { width: 400, height: 300, name: "small" },
    { width: 800, height: 600, name: "medium" },
    { width: 1200, height: 900, name: "large" },
  ];

  const testData = {
    chartType: "line",
    chartData: {
      title: "尺寸测试",
      categories: ["A", "B", "C", "D"],
      series: [{ name: "测试数据", data: [10, 20, 15, 25] }],
    },
  };

  for (const size of sizes) {
    try {
      const requestData = {
        ...testData,
        imageOptions: {
          width: size.width,
          height: size.height,
          backgroundColor: "#f0f8ff",
        },
      };

      const response = await fetch(`${BASE_URL}/png`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      const filename = path.join(outputDir, `test-size-${size.name}.png`);
      fs.writeFileSync(filename, Buffer.from(buffer));

      console.log(
        `✅ ${size.name} 尺寸 (${size.width}x${size.height}) 生成成功`,
      );
      console.log(`📁 文件: ${filename} (${buffer.byteLength} bytes)`);
    } catch (error) {
      console.error(`❌ ${size.name} 尺寸生成失败:`, error.message);
    }
  }
}

// 测试错误情况处理
async function testErrorHandling() {
  console.log("🔄 测试错误处理...");

  const testCases = [
    {
      name: "缺少chartType",
      data: {
        chartData: { title: "测试" },
      },
    },
    {
      name: "缺少chartData",
      data: {
        chartType: "line",
      },
    },
    {
      name: "不支持的图表类型",
      data: {
        chartType: "unsupported",
        chartData: { title: "测试" },
      },
    },
    {
      name: "无效的图表数据",
      data: {
        chartType: "line",
        chartData: {},
      },
    },
  ];

  for (const testCase of testCases) {
    try {
      const response = await fetch(`${BASE_URL}/png`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testCase.data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`⚠️  ${testCase.name}: 期望错误但成功了`);
      } else {
        console.log(`✅ ${testCase.name}: 正确返回错误 - ${result.error}`);
      }
    } catch (error) {
      console.log(`✅ ${testCase.name}: 正确抛出异常 - ${error.message}`);
    }
  }
}

// 性能测试
async function testPerformance() {
  console.log("🔄 测试PNG生成性能...");

  const testData = {
    chartType: "line",
    chartData: {
      title: "性能测试",
      categories: Array.from({ length: 12 }, (_, i) => `月份${i + 1}`),
      series: Array.from({ length: 5 }, (_, i) => ({
        name: `系列${i + 1}`,
        data: Array.from({ length: 12 }, () => Math.random() * 100),
      })),
    },
    imageOptions: {
      width: 1000,
      height: 600,
    },
  };

  const iterations = 3;
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now();

    try {
      const response = await fetch(`${BASE_URL}/png`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      await response.arrayBuffer();
      const endTime = Date.now();
      const duration = endTime - startTime;
      times.push(duration);

      console.log(`✅ 第${i + 1}次生成: ${duration}ms`);
    } catch (error) {
      console.error(`❌ 第${i + 1}次生成失败:`, error.message);
    }
  }

  if (times.length > 0) {
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    console.log(`📊 性能统计:`);
    console.log(`  平均时间: ${avgTime.toFixed(2)}ms`);
    console.log(`  最快时间: ${minTime}ms`);
    console.log(`  最慢时间: ${maxTime}ms`);
  }
}

// 运行所有测试
async function runAllTests() {
  console.log("🚀 开始PNG功能测试...\n");

  // 等待服务器启动
  console.log("⏳ 等待服务器启动...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await testPNGEndpointInfo();
  console.log("");

  await testLineChartPNG();
  console.log("");

  await testHistogramPNG();
  console.log("");

  await testPieChartPNG();
  console.log("");

  await testMapPNG();
  console.log("");

  await testDifferentSizes();
  console.log("");

  await testErrorHandling();
  console.log("");

  await testPerformance();
  console.log("");

  console.log("🎉 PNG功能测试完成!");
  console.log(`📁 测试输出文件保存在: ${outputDir}/`);
  console.log("\n📋 生成的文件列表:");

  try {
    const files = fs.readdirSync(outputDir);
    files.forEach((file) => {
      const filePath = path.join(outputDir, file);
      const stats = fs.statSync(filePath);
      console.log(`  - ${file} (${stats.size} bytes)`);
    });
  } catch (error) {
    console.log("无法读取输出目录");
  }
}

// CURL示例
function printCurlExamples() {
  console.log("📝 CURL 命令示例:\n");

  console.log("1. 获取PNG端点信息:");
  console.log("curl http://localhost:3000/png\n");

  console.log("2. 生成折线图PNG:");
  console.log(`curl -X POST http://localhost:3000/png \\
  -H "Content-Type: application/json" \\
  -d '{
    "chartType": "line",
    "chartData": {
      "title": "示例折线图",
      "categories": ["A", "B", "C", "D"],
      "series": [
        {"name": "系列1", "data": [10, 20, 30, 40]}
      ]
    },
    "imageOptions": {
      "width": 800,
      "height": 600,
      "backgroundColor": "#ffffff"
    }
  }' \\
  --output chart.png\n`);

  console.log("3. 生成饼图PNG:");
  console.log(`curl -X POST http://localhost:3000/png \\
  -H "Content-Type: application/json" \\
  -d '{
    "chartType": "pie",
    "chartData": {
      "title": "示例饼图",
      "data": [
        {"name": "A", "value": 30},
        {"name": "B", "value": 70}
      ]
    }
  }' \\
  --output pie-chart.png\n`);
}

// 主程序
if (import.meta.main) {
  const args = process.argv.slice(2);

  if (args.includes("--curl")) {
    printCurlExamples();
  } else if (args.includes("--performance")) {
    testPerformance();
  } else if (args.includes("--errors")) {
    testErrorHandling();
  } else {
    runAllTests();
  }
}

// 导出函数供其他模块使用
export {
  testPNGEndpointInfo,
  testLineChartPNG,
  testHistogramPNG,
  testPieChartPNG,
  testMapPNG,
  testDifferentSizes,
  testErrorHandling,
  testPerformance,
  runAllTests,
  printCurlExamples,
};
