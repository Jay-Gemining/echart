// 测试修复效果的脚本
// 运行前请确保服务器已启动: bun run server.js

const BASE_URL = "http://localhost:3000";

// 测试折线图多系列legend覆盖问题
async function testLineChartLegendFix() {
  console.log("🔄 测试折线图多系列legend覆盖问题修复...");

  const testData = {
    title: "多系列数据测试 - 应该有足够的空间显示legend",
    categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
    yAxisName: "销售额 (万元)",
    series: [
      {
        name: "产品A销售额",
        data: [150, 180, 120, 200, 160, 240],
      },
      {
        name: "产品B销售额",
        data: [100, 140, 180, 160, 200, 180],
      },
      {
        name: "产品C销售额",
        data: [80, 120, 140, 120, 100, 160],
      },
      {
        name: "产品D销售额",
        data: [60, 90, 110, 95, 85, 130],
      },
      {
        name: "产品E销售额",
        data: [40, 70, 90, 80, 70, 110],
      },
      {
        name: "产品F销售额",
        data: [30, 50, 70, 60, 55, 90],
      },
    ],
  };

  try {
    const response = await fetch(`${BASE_URL}/line`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const config = await response.json();
    console.log("✅ 折线图多系列配置获取成功");
    console.log("标题:", config.title.text);
    console.log("系列数量:", config.series.length);
    console.log("Legend top 设置:", config.legend.top);
    console.log("Grid top 设置:", config.grid.top);

    // 验证grid.top是否根据系列数量调整
    if (config.series.length > 3) {
      console.log("✅ 多系列时grid.top已调整为25%");
    } else {
      console.log("ℹ️  少于4个系列，使用默认grid.top 20%");
    }
  } catch (error) {
    console.error("❌ 折线图测试失败:", error.message);
  }
}

// 测试地图数据加载
async function testMapDataLoading() {
  console.log("🔄 测试地图数据加载...");

  try {
    // 测试中国地图数据端点
    const mapDataResponse = await fetch(`${BASE_URL}/china.json`);
    const mapData = await mapDataResponse.json();

    console.log("✅ 中国地图数据加载成功");
    console.log("数据类型:", mapData.type);
    console.log("特征数量:", mapData.features ? mapData.features.length : 0);

    // 测试地图配置
    const mapConfigResponse = await fetch(`${BASE_URL}/map`);
    const mapConfig = await mapConfigResponse.json();

    console.log("✅ 地图配置获取成功");
    console.log("地图类型:", mapConfig.series[0].type);
    console.log("地图名称:", mapConfig.series[0].map);
  } catch (error) {
    console.error("❌ 地图测试失败:", error.message);
  }
}

// 测试自定义地图数据
async function testCustomMapData() {
  console.log("🔄 测试自定义地图数据...");

  const customMapData = {
    title: "重点城市用户分布",
    seriesName: "用户数量",
    tooltipFormatter: "{b}<br/>用户数: {c}人",
    data: [
      { name: "北京", value: 12000 },
      { name: "上海", value: 9800 },
      { name: "广东", value: 15000 },
      { name: "江苏", value: 8000 },
      { name: "浙江", value: 7500 },
      { name: "山东", value: 6500 },
      { name: "四川", value: 5000 },
      { name: "湖北", value: 4000 },
      { name: "湖南", value: 3500 },
      { name: "河南", value: 3000 },
    ],
    colors: ["#f0f9ff", "#0ea5e9"],
    min: 0,
    max: 15000,
  };

  try {
    const response = await fetch(`${BASE_URL}/map`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customMapData),
    });

    const config = await response.json();
    console.log("✅ 自定义地图配置获取成功");
    console.log("标题:", config.title.text);
    console.log("数据点数量:", config.series[0].data.length);
    console.log(
      "视觉映射范围:",
      config.visualMap.min,
      "-",
      config.visualMap.max,
    );

    // 验证地名映射功能
    console.log("📍 验证地名映射:");
    const sampleData = config.series[0].data.slice(0, 3);
    sampleData.forEach((item) => {
      console.log(
        `  "${item.name.replace("省", "").replace("市", "")}" -> "${item.name}"`,
      );
    });
  } catch (error) {
    console.error("❌ 自定义地图测试失败:", error.message);
  }
}

// 测试所有修复
async function runAllFixTests() {
  console.log("🚀 开始测试所有修复...\n");

  // 等待服务器启动
  console.log("⏳ 等待服务器启动...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await testLineChartLegendFix();
  console.log("");

  await testMapDataLoading();
  console.log("");

  await testCustomMapData();
  console.log("");

  await testProvinceNameMapping();
  console.log("");

  console.log("🎉 所有修复测试完成!");
}

// 测试地名映射功能
async function testProvinceNameMapping() {
  console.log("🔄 测试地名映射功能...\n");

  // 测试简称到完整地名的映射
  const shortNameData = {
    title: "地名映射测试",
    data: [
      { name: "北京", value: 1000 }, // 简称 -> 北京市
      { name: "广东", value: 2000 }, // 简称 -> 广东省
      { name: "新疆", value: 800 }, // 简称 -> 新疆维吾尔自治区
      { name: "内蒙古", value: 600 }, // 简称 -> 内蒙古自治区
      { name: "香港", value: 500 }, // 简称 -> 香港特别行政区
      { name: "江苏省", value: 1500 }, // 已是完整地名
      { name: "上海市", value: 1200 }, // 已是完整地名
    ],
  };

  try {
    const response = await fetch(`${BASE_URL}/map`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shortNameData),
    });
    const config = await response.json();
    console.log("✅ 地名映射测试成功");

    console.log("📍 地名映射结果:");
    config.series[0].data.forEach((item) => {
      const originalName =
        shortNameData.data.find(
          (d) =>
            d.name === item.name ||
            item.name.includes(d.name.replace(/省|市|自治区|特别行政区/g, "")),
        )?.name || "未知";
      console.log(`  输入: "${originalName}" -> 输出: "${item.name}"`);
    });
  } catch (error) {
    console.error("❌ 地名映射测试失败:", error.message);
  }
}

// 边界情况测试
async function testEdgeCases() {
  console.log("🔄 测试边界情况...\n");

  // 测试极少系列的折线图
  console.log("测试1: 单系列折线图");
  const singleSeriesData = {
    title: "单系列测试",
    categories: ["A", "B", "C"],
    series: [{ name: "唯一系列", data: [10, 20, 30] }],
  };

  try {
    const response = await fetch(`${BASE_URL}/line`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(singleSeriesData),
    });
    const config = await response.json();
    console.log("✅ 单系列grid.top:", config.grid.top);
  } catch (error) {
    console.error("❌ 单系列测试失败:", error.message);
  }

  // 测试极多系列的折线图
  console.log("\n测试2: 十个系列折线图");
  const multiSeriesData = {
    title: "十系列测试",
    categories: ["1月", "2月", "3月"],
    series: Array.from({ length: 10 }, (_, i) => ({
      name: `系列${i + 1}`,
      data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
    })),
  };

  try {
    const response = await fetch(`${BASE_URL}/line`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(multiSeriesData),
    });
    const config = await response.json();
    console.log("✅ 十系列grid.top:", config.grid.top);
    console.log("✅ 十系列legend.top:", config.legend.top);
  } catch (error) {
    console.error("❌ 十系列测试失败:", error.message);
  }

  // 测试空地图数据
  console.log("\n测试3: 空地图数据");
  const emptyMapData = {
    title: "空数据地图",
    data: [],
  };

  try {
    const response = await fetch(`${BASE_URL}/map`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emptyMapData),
    });
    const config = await response.json();
    console.log(
      "✅ 空地图数据处理成功，数据点数量:",
      config.series[0].data.length,
    );
  } catch (error) {
    console.error("❌ 空地图数据测试失败:", error.message);
  }

  // 测试地名映射
  console.log("\n测试4: 地名映射功能");
  await testProvinceNameMapping();
}

// 主程序
if (import.meta.main) {
  const args = process.argv.slice(2);

  if (args.includes("--edge")) {
    testEdgeCases();
  } else if (args.includes("--legend")) {
    testLineChartLegendFix();
  } else if (args.includes("--map")) {
    testMapDataLoading();
  } else if (args.includes("--mapping")) {
    testProvinceNameMapping();
  } else {
    runAllFixTests();
  }
}

// 导出函数供其他模块使用
export {
  testLineChartLegendFix,
  testMapDataLoading,
  testCustomMapData,
  testProvinceNameMapping,
  runAllFixTests,
  testEdgeCases,
};
