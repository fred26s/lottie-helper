import argv from "minimist";
import cheerio from "cheerio";
import { loadHTML, writeHTML, loadJs } from "./loadJson";
import axios from "./utils/axios";
import { getToken, setToken } from "./utils/token";
import config from "./config/index.js";
console.log("%c 🍬 config", "color:#465975", config);

import {coreLoadHTML, coreReset, coreFetchJson, coreInsertDOM} from "./core/index"

const argvJson = argv(process.argv.slice(2));
const { userJsonURL, removeFlagFile } = argvJson;
console.log(argvJson);
console.log("userJsonURL：", userJsonURL);
// ===判断指令string
const hasUserJsonURL = userJsonURL === "undefined" ? false : userJsonURL;
// console.log("---");
console.log(removeFlagFile);
// console.log(removeFlagFile === true);
console.log(`Release-Time:${new Date()}`);
(async () => {
  // * 首先获取jwt
  try {
    const token = await getToken();
    setToken(token);
  } catch (error) {
    console.log(`getTokenErr: ${error}`);
  }

  try {
    // 将获取的JSON资源打包整合

    // * 根据参数获取资源，插入指定文件
    // * 1.获取源HTML文件
    // TODO 优化：遍历自动寻找，执行命令的目录下index
    // 暂使用执行命令目录下的index.html， 支持传入文件名
    const htmlFileName = "index.html";
    const $ = await coreLoadHTML();

    // 重置清空，支持反复执行初始化命令
    coreReset($)

    // * 加载动画JSON
    // URL加载JSON
    let jsonResult = await coreFetchJson(hasUserJsonURL)

    // * 2.操作HTML，插入内容
    // 插入controller动画逻辑
    await coreInsertDOM($, jsonResult)

    // * 3.输出修改后的HTML资源
    const htmlStr = $.html();
    // TODO 优化：输出到之前遍历获取的HTML路径
    const writeRes = await writeHTML(htmlFileName, htmlStr);
    console.log(writeRes);
  } catch (error) {
    console.log(error);
  }
})();
