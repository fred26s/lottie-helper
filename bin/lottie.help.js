#!/usr/bin/env node

const childProcess = require("child_process");
const { program } = require("commander");
const { resolve, join } = require("path");

const versionDir = resolve(__dirname, "..");
const versionPath = join(versionDir, "package.json");
var packageJson = require(`${versionPath}`);

// * commander命令行参数处理
var jsonURL;
program
  .version(packageJson.version, "-v, -V , --version")
  // 自定义lottie jsonURL
  .option(
    "-j,--json <jsonURL>",
    "jsonURL: can used lottie json URL(GET-URL)",
    (val) => {
      jsonURL = val || "";
      if (val) {
        console.log("Use external resource json");
        console.log(val);
      }
    }
  )
  .parse(process.argv);

const nodeRunShell = (shell) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(shell, (error, stdout, stderr) => {
      error && console.log("error", error);
      stdout && console.log("stdout", stdout);
      stderr && console.log("stderr", stderr);
      if (!error) {
        console.log("lottie-helper mission completed. 执行成功...");
        resolve("lottie-helper mission completed. 执行成功...");
        // 成功
      } else {
        // 失败
        console.log("lottie-helper shell Failed to execute. 执行失败");
        reject("lottie-helper shell Failed to execute. 执行失败");
      }
    });
  });
};

// 这里引用执行全局插件路径下的主文件
const mainPath = resolve(__dirname, "..");
// * 这里若是调试模式，则引入/dist/bundle.js未编译文件即可
nodeRunShell(`node ${mainPath}/dist/bundle.min.js --userJsonURL ${jsonURL}`);
