#!/usr/bin/env bun

// ECharts 服务器启动检查脚本
// 确保所有必要文件存在并启动服务器

import { existsSync } from "fs";
import { spawn } from "child_process";

console.log("🚀 ECharts 服务器启动检查...\n");

// 检查必要文件
const requiredFiles = [
  { file: "src/server.js", description: "主服务器文件" },
  { file: "data/china.json", description: "中国地图GeoJSON数据" },
  { file: "data/world.json", description: "世界地图GeoJSON数据" },
  { file: "package.json", description: "项目配置文件" },
];

let allFilesExist = true;

for (const { file, description } of requiredFiles) {
  if (existsSync(file)) {
    console.log(`✅ ${description}: ${file}`);
  } else {
    console.log(`❌ 缺少${description}: ${file}`);
    allFilesExist = false;
  }
}

// 检查node_modules
if (existsSync("node_modules")) {
  console.log("✅ 依赖包已安装: node_modules");
} else {
  console.log("⚠️  依赖包未安装，正在安装...");
  const installProcess = spawn("bun", ["install"], {
    stdio: "inherit",
    shell: true,
  });

  installProcess.on("close", (code) => {
    if (code === 0) {
      console.log("✅ 依赖包安装完成");
      startServer();
    } else {
      console.log("❌ 依赖包安装失败");
      process.exit(1);
    }
  });

  return;
}

if (!allFilesExist) {
  console.log("\n❌ 启动检查失败！请确保所有必要文件存在。");

  if (!existsSync("data/china.json")) {
    console.log("\n💡 获取中国地图数据的方法：");
    console.log("1. 从以下地址下载中国地图GeoJSON数据：");
    console.log(
      "   https://raw.githubusercontent.com/yezongyang/china-geojson/master/china.json",
    );
    console.log("2. 将下载的文件保存为 data/china.json");
    console.log("3. 或者运行以下命令：");
    console.log(
      "   curl -o data/china.json https://raw.githubusercontent.com/yezongyang/china-geojson/master/china.json",
    );
  }

  if (!existsSync("data/world.json")) {
    console.log("\n💡 获取世界地图数据的方法：");
    console.log("1. 从以下地址下载世界地图GeoJSON数据：");
    console.log(
      "   https://github.com/tower1229/echarts-world-map-jeojson/blob/master/worldZH.json",
    );
    console.log("2. 将下载的文件保存为 data/world.json");
    console.log("3. 或者运行以下命令：");
    console.log(
      "   curl -o data/world.json https://github.com/tower1229/echarts-world-map-jeojson/blob/master/worldZH.json",
    );
  }

  process.exit(1);
}

console.log("\n✅ 所有检查通过！启动服务器...\n");
startServer();

function startServer() {
  const serverProcess = spawn("bun", ["run", "src/server.js"], {
    stdio: "inherit",
    shell: true,
  });

  // 处理服务器进程退出
  serverProcess.on("close", (code) => {
    if (code === 0) {
      console.log("\n✅ 服务器正常关闭");
    } else {
      console.log(`\n❌ 服务器异常退出，退出码: ${code}`);
    }
  });

  // 处理中断信号
  process.on("SIGINT", () => {
    console.log("\n\n⏹️  正在关闭服务器...");
    serverProcess.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    console.log("\n\n⏹️  正在关闭服务器...");
    serverProcess.kill("SIGTERM");
  });
}
