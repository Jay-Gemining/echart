// ECharts 服务器 API 使用示例
// 运行前请确保服务器已启动: bun run server.js

const BASE_URL = 'http://localhost:3000';

// 测试折线图 POST 请求
async function testLineChart() {
  console.log('🔄 测试折线图 POST 请求...');

  const data = {
    title: "销售业绩对比",
    categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
    yAxisName: "销售额 (万元)",
    series: [
      {
        name: "产品A",
        data: [150, 180, 120, 200, 160, 240]
      },
      {
        name: "产品B",
        data: [100, 140, 180, 160, 200, 180]
      },
      {
        name: "产品C",
        data: [80, 120, 140, 120, 100, 160]
      }
    ]
  };

  try {
    const response = await fetch(`${BASE_URL}/line`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const config = await response.json();
    console.log('✅ 折线图配置获取成功');
    console.log('标题:', config.title.text);
    console.log('系列数量:', config.series.length);
  } catch (error) {
    console.error('❌ 折线图测试失败:', error.message);
  }
}

// 测试直方图 POST 请求
async function testHistogram() {
  console.log('🔄 测试直方图 POST 请求...');

  const data = {
    title: "考试成绩分布",
    categories: ["60-70", "70-80", "80-90", "90-100"],
    data: [15, 25, 35, 20],
    xAxisName: "分数段",
    yAxisName: "人数",
    seriesName: "学生人数"
  };

  try {
    const response = await fetch(`${BASE_URL}/histogram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const config = await response.json();
    console.log('✅ 直方图配置获取成功');
    console.log('标题:', config.title.text);
    console.log('数据点数量:', config.series[0].data.length);
  } catch (error) {
    console.error('❌ 直方图测试失败:', error.message);
  }
}

// 测试饼图 POST 请求
async function testPieChart() {
  console.log('🔄 测试饼图 POST 请求...');

  const data = {
    title: "客户来源分析",
    seriesName: "客户来源",
    data: [
      { name: "搜索引擎", value: 450, color: "#5470c6" },
      { name: "社交媒体", value: 300, color: "#91cc75" },
      { name: "直接访问", value: 200, color: "#fac858" },
      { name: "邮件营销", value: 150, color: "#ee6666" },
      { name: "其他渠道", value: 100, color: "#73c0de" }
    ]
  };

  try {
    const response = await fetch(`${BASE_URL}/pie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const config = await response.json();
    console.log('✅ 饼图配置获取成功');
    console.log('标题:', config.title.text);
    console.log('数据项数量:', config.series[0].data.length);
  } catch (error) {
    console.error('❌ 饼图测试失败:', error.message);
  }
}

// 测试地图 POST 请求
async function testMapChart() {
  console.log('🔄 测试地图 POST 请求...');

  const data = {
    title: "用户分布图",
    seriesName: "用户数量",
    tooltipFormatter: "{b}<br/>用户数: {c}",
    data: [
      { name: "北京", value: 1200 },
      { name: "上海", value: 980 },
      { name: "广东", value: 1500 },
      { name: "江苏", value: 800 },
      { name: "浙江", value: 750 },
      { name: "山东", value: 650 },
      { name: "四川", value: 500 },
      { name: "湖北", value: 400 },
      { name: "湖南", value: 350 },
      { name: "河南", value: 300 }
    ],
    colors: ["#f0f9ff", "#0ea5e9"]
  };

  try {
    const response = await fetch(`${BASE_URL}/map`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const config = await response.json();
    console.log('✅ 地图配置获取成功');
    console.log('标题:', config.title.text);
    console.log('数据点数量:', config.series[0].data.length);
  } catch (error) {
    console.error('❌ 地图测试失败:', error.message);
  }
}

// 测试所有GET请求
async function testGetEndpoints() {
  console.log('🔄 测试所有 GET 端点...');

  const endpoints = ['line', 'histogram', 'pie', 'map'];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`);
      const config = await response.json();
      console.log(`✅ GET /${endpoint} 成功 - 标题: ${config.title.text}`);
    } catch (error) {
      console.error(`❌ GET /${endpoint} 失败:`, error.message);
    }
  }
}

// 运行所有测试
async function runAllTests() {
  console.log('🚀 开始测试 ECharts 服务器 API...\n');

  // 等待服务器启动
  console.log('⏳ 等待服务器启动...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 测试GET端点
  await testGetEndpoints();
  console.log('');

  // 测试POST端点
  await testLineChart();
  console.log('');

  await testHistogram();
  console.log('');

  await testPieChart();
  console.log('');

  await testMapChart();
  console.log('');

  console.log('🎉 所有测试完成!');
}

// CURL 命令示例
function printCurlExamples() {
  console.log('📝 CURL 命令示例:\n');

  console.log('1. 获取默认折线图:');
  console.log('curl http://localhost:3000/line\n');

  console.log('2. 提交自定义折线图数据:');
  console.log(`curl -X POST http://localhost:3000/line \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "自定义折线图",
    "categories": ["A", "B", "C", "D"],
    "series": [
      {"name": "系列1", "data": [10, 20, 30, 40]},
      {"name": "系列2", "data": [15, 25, 35, 45]}
    ]
  }'\n`);

  console.log('3. 提交自定义饼图数据:');
  console.log(`curl -X POST http://localhost:3000/pie \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "市场占有率",
    "data": [
      {"name": "产品A", "value": 40},
      {"name": "产品B", "value": 30},
      {"name": "产品C", "value": 20},
      {"name": "产品D", "value": 10}
    ]
  }'\n`);
}

// 主程序
if (import.meta.main) {
  const args = process.argv.slice(2);

  if (args.includes('--curl')) {
    printCurlExamples();
  } else {
    runAllTests();
  }
}

// 导出函数供其他模块使用
export {
  testLineChart,
  testHistogram,
  testPieChart,
  testMapChart,
  testGetEndpoints,
  runAllTests,
  printCurlExamples
};
