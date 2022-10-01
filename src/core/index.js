import cheerio from "cheerio";
import { loadHTML, loadHTMLDir, loadJs, writeHTML } from "../utils/file";
import axios from "../utils/axios";
import config from "../config/index.js";
import { getToken, setToken } from "../utils/token";

// TODO 优化：遍历自动寻找，执行命令的目录下index
// 暂使用执行命令目录下的index.html， 支持传入文件名
export async function coreLoadHTML() {
  try {

    const files = await loadHTMLDir();
    let targetFileName;
    // 优先使用默认index.html
    const isDefaultName = files.find((e) => e === config.defaultFileNameHTML);
    // 返回默认index.html，或第一个获取的.html文件
    targetFileName =
      isDefaultName ||
      files.find((e) => {
        const fileExtension = e.split(".").pop().toLowerCase();
        if (fileExtension === "html") {
          return e;
        }
      });
    // 若未找到.html则抛出错误
    if (!targetFileName) return Promise.reject('lottie-helper ERR: 同级目录下未找到.html文件')
    console.log(`target resource: ${targetFileName}`)
    // 缓存全局变量
    global.targetFileName = targetFileName;

    const htmlResult = await loadHTML(targetFileName);
    const $ = cheerio.load(htmlResult);
    return $;
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
}

// 初始化，删除lohelp所插入的改变
export async function coreReset($) {
  $(`div[class=${config.defaultUniqFlag}]`).remove();
  $(`style[class=${config.defaultUniqFlag}]`).remove();
  $(`script[class=${config.defaultUniqFlag}]`).remove();
}

// 插入lohelp生成的DOM元素
export async function coreInsertDOM($, jsonResult) {
  const bundleResult = await loadJs("controller.min.js");
  $("body").prepend(
    `<script type="text/javascript" class="${config.defaultUniqFlag}">${bundleResult}</script>`
  );
  // 将加载的json文件，动态在第一行插入  `window.animateJson = 动画json`
  $("body").prepend(
    `<script type="text/javascript" class="${config.defaultUniqFlag}">window.animateJson=${jsonResult}</script>`
  );
  // lottie动画DOM容器
  $("body").prepend(
    `<div id="lottie-wrapper" class="${config.defaultUniqFlag}"><div id="lottie"></div></div>`
  );
  $("head").append(
    `<style class="${config.defaultUniqFlag}">#lottie-wrapper {position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: #fff;background-size: cover;z-index: 999999 !important;transition: all 1s;overflow: hidden;}#lottie {position: absolute;left: 50%;top: 50%;width: 50%;transform: translate(-50%, -50%);}</style>`
  );
  // lottie依赖库
  $("head").append(
    `<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js" class="${config.defaultUniqFlag}"></script>`
  );
}

// 获取自定义动画JSON
export async function coreFetchJson(hasUserJsonURL) {
  // * 加载动画JSON
  // URL加载JSON
  let jsonResult = "it fuckin empty jsonResult.";
  // * 替换serverless后，这里使用绝对路径的URL
  const jsonURL = hasUserJsonURL || config.defaultResourceURL;
  const fullJsonURL = `${jsonURL}`;
  try {
    const { status, data } = await axios(fullJsonURL);
    if (status === 200) {
      jsonResult = JSON.stringify(data);
    } else {
      return new Error(` [ERROR] URL RESPONSE STATUS: ${status}`);
    }
  } catch (error) {
    const {
      response: { status, statusText },
    } = error;
    console.log(`status:${status}`);
    console.log(`statusText:${statusText}`);
    console.log("get jsonURL error, please check you jsonURL.");
  }
  return jsonResult;
}

// 将处理过的文件输出回源文件
export async function coreWriteFile($) {
  // * 加载动画JSON
  const htmlStr = $.html();
  // 优化：输出到之前遍历获取的HTML路径
  const targetFileName = global.targetFileName;
  const writeRes = await writeHTML(targetFileName, htmlStr);
  console.log(writeRes);
}

// 接口权限
export async function coreAuth() {
  try {
    const token = await getToken();
    setToken(token);
  } catch (error) {
    console.log(`coreAuthErr: ${error}`);
  }
}
