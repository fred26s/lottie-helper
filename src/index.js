import argv from "minimist";

import {
  coreLoadHTML,
  coreReset,
  coreFetchJson,
  coreInsertDOM,
  coreWriteFile,
  coreAuth,
} from "./core/index";

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
  try {
    // * 接口权限处理
    await coreAuth();

    // * 根据参数获取资源，插入指定文件
    // * 1.获取源HTML文件
    const $ = await coreLoadHTML();

    // 重置清空，支持反复执行初始化命令
    coreReset($);

    // * 2.加载动画JSON
    // URL加载JSON
    let jsonResult = await coreFetchJson(hasUserJsonURL);

    // * 3.操作HTML，插入内容
    // 插入controller动画逻辑
    await coreInsertDOM($, jsonResult);

    // * 4.输出修改后的HTML资源
    await coreWriteFile($);
  } catch (error) {
    console.log(error);
  }
})();
