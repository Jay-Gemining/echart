// 散点图气泡效果示例文件
// 专门演示散点图中每个点可以设置不同大小的功能

const baseUrl = "http://localhost:3000";

console.log("🔹 散点图气泡效果示例启动...");

// 气泡图示例数据
const bubbleExamples = {
  // 1. 公司员工分析 - 工作年限 vs 薪资 vs 绩效得分
  employeeAnalysis: {
    title: "员工分析气泡图 - 年限vs薪资vs绩效",
    xAxisName: "工作年限(年)",
    yAxisName: "薪资(万元)",
    series: [
      {
        name: "技术部",
        data: [
          { value: [1, 8, 75] },    // 1年，8万，绩效75分
          { value: [2, 12, 85] },   // 2年，12万，绩效85分
          { value: [3, 16, 90] },   // 3年，16万，绩效90分
          { value: [5, 25, 95] },   // 5年，25万，绩效95分
          { value: [8, 40, 88] },   // 8年，40万，绩效88分
          { value: [10, 50, 92] },  // 10年，50万，绩效92分
        ]
      },
      {
        name: "销售部",
        data: [
          { value: [1, 6, 70] },    // 1年，6万，绩效70分
          { value: [2, 10, 80] },   // 2年，10万，绩效80分
          { value: [3, 15, 85] },   // 3年，15万，绩效85分
          { value: [4, 22, 90] },   // 4年，22万，绩效90分
          { value: [6, 35, 95] },   // 6年，35万，绩效95分
          { value: [8, 45, 88] },   // 8年，45万，绩效88分
        ]
      },
      {
        name: "运营部",
        data: [
          { value: [1, 7, 72] },    // 1年，7万，绩效72分
          { value: [2, 11, 78] },   // 2年，11万，绩效78分
          { value: [4, 18, 82] },   // 4年，18万，绩效82分
          { value: [6, 28, 87] },   // 6年，28万，绩效87分
          { value: [9, 42, 90] },   // 9年，42万，绩效90分
        ]
      }
    ]
  },

  // 2. 产品分析 - 价格 vs 销量 vs 用户满意度
  productAnalysis: {
    title: "产品分析气泡图 - 价格vs销量vs满意度",
    xAxisName: "价格(元)",
    yAxisName: "月销量(件)",
    series: [
      {
        name: "手机类",
        data: [
          { value: [1999, 5000, 85] },  // 1999元，5000件，满意度85
          { value: [2999, 3500, 88] },  // 2999元，3500件，满意度88
          { value: [3999, 2000, 90] },  // 3999元，2000件，满意度90
          { value: [4999, 1200, 92] },  // 4999元，1200件，满意度92
          { value: [5999, 800, 95] },   // 5999元，800件，满意度95
        ]
      },
      {
        name: "电脑类",
        data: [
          { value: [3999, 1500, 82] },  // 3999元，1500件，满意度82
          { value: [5999, 1000, 85] },  // 5999元，1000件，满意度85
          { value: [7999, 600, 88] },   // 7999元，600件，满意度88
          { value: [9999, 400, 90] },   // 9999元，400件，满意度90
          { value: [12999, 200, 93] },  // 12999元，200件，满意度93
        ]
      },
      {
        name: "配件类",
        data: [
          { value: [99, 8000, 75] },    // 99元，8000件，满意度75
          { value: [199, 6000, 80] },   // 199元，6000件，满意度80
          { value: [299, 4000, 82] },   // 299元，4000件，满意度82
          { value: [499, 2500, 85] },   // 499元，2500件，满意度85
          { value: [799, 1500, 88] },   // 799元，1500件，满意度88
        ]
      }
    ]
  },

  // 3. 城市发展指数 - GDP vs 人口 vs 环境质量
  cityDevelopment: {
    title: "城市发展指数 - GDP vs 人口 vs 环境质量",
    xAxisName: "GDP(万亿元)",
    yAxisName: "人口(万人)",
    series: [
      {
        name: "一线城市",
        data: [
          { value: [4.0, 2188, 75] },   // 北京：GDP 4万亿，2188万人，环境75分
          { value: [4.3, 2428, 70] },   // 上海：GDP 4.3万亿，2428万人，环境70分
          { value: [2.8, 1756, 85] },   // 深圳：GDP 2.8万亿，1756万人，环境85分
          { value: [2.5, 1868, 80] },   // 广州：GDP 2.5万亿，1868万人，环境80分
        ]
      },
      {
        name: "新一线城市",
        data: [
          { value: [1.8, 1194, 82] },   // 杭州：GDP 1.8万亿，1194万人，环境82分
          { value: [1.6, 932, 78] },    // 南京：GDP 1.6万亿，932万人，环境78分
          { value: [2.0, 2094, 75] },   // 成都：GDP 2.0万亿，2094万人，环境75分
          { value: [1.7, 1364, 80] },   // 武汉：GDP 1.7万亿，1364万人，环境80分
          { value: [1.0, 1295, 85] },   // 西安：GDP 1.0万亿，1295万人，环境85分
        ]
      },
      {
        name: "二线城市",
        data: [
          { value: [0.8, 874, 88] },    // 昆明：GDP 0.8万亿，874万人，环境88分
          { value: [0.6, 746, 92] },    // 贵阳：GDP 0.6万亿，746万人，环境92分
          { value: [0.7, 325, 95] },    // 海口：GDP 0.7万亿，325万人，环境95分
          { value: [0.9, 558, 90] },    // 福州：GDP 0.9万亿，558万人，环境90分
        ]
      }
    ]
  },

  // 4. 股票分析 - 市盈率 vs 涨跌幅 vs 成交量
  stockAnalysis: {
    title: "股票分析气泡图 - 市盈率vs涨跌幅vs成交量",
    xAxisName: "市盈率(PE)",
    yAxisName: "涨跌幅(%)",
    series: [
      {
        name: "科技股",
        data: [
          { value: [25, 5.2, 800] },    // PE 25，涨5.2%，成交量800万
          { value: [30, 3.8, 650] },    // PE 30，涨3.8%，成交量650万
          { value: [35, -1.5, 420] },   // PE 35，跌1.5%，成交量420万
          { value: [22, 7.1, 900] },    // PE 22，涨7.1%，成交量900万
          { value: [28, 2.3, 560] },    // PE 28，涨2.3%，成交量560万
        ]
      },
      {
        name: "金融股",
        data: [
          { value: [8, 1.2, 1200] },    // PE 8，涨1.2%，成交量1200万
          { value: [12, 0.8, 950] },    // PE 12，涨0.8%，成交量950万
          { value: [10, -0.5, 800] },   // PE 10，跌0.5%，成交量800万
          { value: [15, 2.1, 1100] },   // PE 15，涨2.1%，成交量1100万
          { value: [9, 1.8, 1350] },    // PE 9，涨1.8%，成交量1350万
        ]
      },
      {
        name: "消费股",
        data: [
          { value: [20, 2.5, 600] },    // PE 20，涨2.5%，成交量600万
          { value: [18, 1.8, 720] },    // PE 18，涨1.8%，成交量720万
          { value: [22, -0.8, 450] },   // PE 22，跌0.8%，成交量450万
          { value: [25, 3.2, 850] },    // PE 25，涨3.2%，成交量850万
          { value: [16, 0.9, 680] },    // PE 16，涨0.9%，成交量680万
        ]
      }
    ]
  },

  // 5. 健康数据分析 - 运动时间 vs BMI vs 年龄
  healthAnalysis: {
    title: "健康数据分析 - 运动时间vs BMI vs年龄",
    xAxisName: "每周运动时间(小时)",
    yAxisName: "BMI指数",
    series: [
      {
        name: "青年组(20-30岁)",
        data: [
          { value: [2, 26.5, 25] },     // 2小时运动，BMI 26.5，25岁
          { value: [5, 24.2, 28] },     // 5小时运动，BMI 24.2，28岁
          { value: [8, 22.1, 26] },     // 8小时运动，BMI 22.1，26岁
          { value: [12, 20.8, 29] },    // 12小时运动，BMI 20.8，29岁
          { value: [3, 25.8, 22] },     // 3小时运动，BMI 25.8，22岁
        ]
      },
      {
        name: "中年组(30-50岁)",
        data: [
          { value: [1, 28.3, 35] },     // 1小时运动，BMI 28.3，35岁
          { value: [3, 26.7, 42] },     // 3小时运动，BMI 26.7，42岁
          { value: [6, 24.5, 38] },     // 6小时运动，BMI 24.5，38岁
          { value: [9, 22.9, 45] },     // 9小时运动，BMI 22.9，45岁
          { value: [4, 25.1, 48] },     // 4小时运动，BMI 25.1，48岁
        ]
      },
      {
        name: "老年组(50岁以上)",
        data: [
          { value: [1, 27.8, 55] },     // 1小时运动，BMI 27.8，55岁
          { value: [2, 26.2, 62] },     // 2小时运动，BMI 26.2，62岁
          { value: [4, 24.8, 58] },     // 4小时运动，BMI 24.8，58岁
          { value: [6, 23.5, 65] },     // 6小时运动，BMI 23.5，65岁
          { value: [3, 25.9, 59] },     // 3小时运动，BMI 25.9，59岁
        ]
      }
    ]
  }
};

// 生成气泡图并保存PNG
async function generateBubbleChart(data, filename, title) {
  try {
    console.log(`\n🔹 生成${title}...`);

    // 1. 生成配置
    const configResponse = await fetch(`${baseUrl}/scatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!configResponse.ok) {
      throw new Error(`配置生成失败! status: ${configResponse.status}`);
    }

    const config = await configResponse.json();
    console.log(`✅ ${title}配置生成成功`);

    // 2. 生成PNG
    const pngResponse = await fetch(`${baseUrl}/png`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType: "scatter",
        chartData: data,
        imageOptions: {
          width: 1200,
          height: 800,
          backgroundColor: "#ffffff"
        }
      }),
    });

    if (!pngResponse.ok) {
      throw new Error(`PNG generation failed! status: ${pngResponse.status}`);
    }

    const pngBuffer = await pngResponse.arrayBuffer();
    console.log(`✅ ${title}PNG生成成功`);
    console.log(`📏 文件大小: ${(pngBuffer.byteLength / 1024).toFixed(2)} KB`);

    // 3. 保存文件
    if (typeof Bun !== "undefined") {
      await Bun.write(`test-output/${filename}`, pngBuffer);
      console.log(`💾 ${title}已保存为: test-output/${filename}`);
    }

    // 4. 分析数据特征
    analyzeDataFeatures(data, title);

    return config;

  } catch (error) {
    console.error(`❌ ${title}生成失败:`, error.message);
    return null;
  }
}

// 分析数据特征
function analyzeDataFeatures(data, title) {
  console.log(`📊 ${title}数据分析:`);

  data.series.forEach(series => {
    const sizes = series.data.map(item => item.value[2]);
    const minSize = Math.min(...sizes);
    const maxSize = Math.max(...sizes);
    const avgSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;

    console.log(`  ${series.name}:`);
    console.log(`    数据点数量: ${series.data.length}`);
    console.log(`    大小范围: ${minSize} - ${maxSize}`);
    console.log(`    平均大小: ${avgSize.toFixed(1)}`);
  });
}

// 展示使用技巧
function showUsageTips() {
  console.log("\n💡 气泡图使用技巧:");
  console.log("1. 数据格式: [x, y, size] - 三个数值分别表示横坐标、纵坐标和气泡大小");
  console.log("2. 大小自动缩放: 系统会将size值自动缩放到5-50像素的显示范围");
  console.log("3. 多系列独立: 每个系列的大小范围独立计算，便于对比");
  console.log("4. 工具提示: 悬停时会显示三个维度的具体数值");
  console.log("5. 应用场景: 适合展示三维数据关系，如风险评估、性能分析等");
}

// 展示API调用示例
function showAPIExamples() {
  console.log("\n📋 API调用示例:");

  console.log("\n1. 获取气泡图配置:");
  console.log(`curl -X POST ${baseUrl}/scatter \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "气泡图示例",
    "xAxisName": "X轴",
    "yAxisName": "Y轴",
    "series": [
      {
        "name": "数据系列",
        "data": [
          {"value": [10, 20, 30]},
          {"value": [15, 25, 50]},
          {"value": [20, 30, 20]}
        ]
      }
    ]
  }'`);

  console.log("\n2. 生成PNG图像:");
  console.log(`curl -X POST ${baseUrl}/png \\
  -H "Content-Type: application/json" \\
  -d '{
    "chartType": "scatter",
    "chartData": { ... },
    "imageOptions": {
      "width": 1200,
      "height": 800,
      "backgroundColor": "#ffffff"
    }
  }' \\
  --output bubble-chart.png`);
}

// 主函数
async function main() {
  console.log("🚀 散点图气泡效果示例程序启动");
  console.log("📡 目标服务器:", baseUrl);
  console.log("=" * 50);

  // 检查服务器状态
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

  console.log("\n🎯 开始生成气泡图示例...");

  // 生成所有示例
  await generateBubbleChart(
    bubbleExamples.employeeAnalysis,
    "bubble-employee-analysis.png",
    "员工分析气泡图"
  );

  await generateBubbleChart(
    bubbleExamples.productAnalysis,
    "bubble-product-analysis.png",
    "产品分析气泡图"
  );

  await generateBubbleChart(
    bubbleExamples.cityDevelopment,
    "bubble-city-development.png",
    "城市发展指数气泡图"
  );

  await generateBubbleChart(
    bubbleExamples.stockAnalysis,
    "bubble-stock-analysis.png",
    "股票分析气泡图"
  );

  await generateBubbleChart(
    bubbleExamples.healthAnalysis,
    "bubble-health-analysis.png",
    "健康数据分析气泡图"
  );

  console.log("\n🎉 所有气泡图示例生成完成!");
  console.log("\n📊 生成的文件:");
  console.log("  - bubble-employee-analysis.png (员工分析)");
  console.log("  - bubble-product-analysis.png (产品分析)");
  console.log("  - bubble-city-development.png (城市发展)");
  console.log("  - bubble-stock-analysis.png (股票分析)");
  console.log("  - bubble-health-analysis.png (健康数据)");

  // 显示使用技巧和API示例
  showUsageTips();
  showAPIExamples();

  console.log("\n🎯 气泡图示例程序完成!");
}

// 运行程序
main().catch(console.error);
