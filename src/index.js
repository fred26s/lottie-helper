import argv from "minimist";
import cheerio from "cheerio";
import { loadHTML, writeHTML, loadJs } from "./loadJson";
import axios from "./utils/axios";
import { getToken, setToken } from "./utils/token";
import config from "./config/index.js";
console.log("%c 🍬 config", "color:#465975", config);

const argvJson = argv(process.argv.slice(2));
const { userJsonURL } = argvJson;
console.log("userJsonURL：", userJsonURL);
// ===判断指令string
const hasUserJsonURL = userJsonURL === "undefined" ? false : userJsonURL;

(async () => {
  // * 首先获取jwt
  try {
    const token = await getToken();
    setToken(token);
  } catch (error) {
    console.log(`getTokenErr: ${error}`);
  }

  // * 加载动画JSON
  // 1.本地加载JSON
  // const jsonResult = await loadJson("lottie.json");
  // 将读取的文件，写入指定位置
  // TODO 这里增加引入JSON的方式： 1.本地JSON 2.远程URL加载
  // 2.URL加载JSON
  let jsonResult = "it fuckin empty jsonResult.";
  const jsonURL = hasUserJsonURL || "/lottie-json/lottie-2.json";
  const aseetsDomain = config.domain;
  const fullJsonURL = `${aseetsDomain}${jsonURL}`;
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

  try {
    // 将获取的JSON资源打包整合

    // * 根据参数获取资源，插入指定文件
    // * 1.获取源HTML文件
    // TODO 优化：遍历自动寻找，执行命令的目录下index
    // 暂使用执行命令目录下的index.html， 支持传入文件名
    const htmlFileName = "index.html";
    const htmlResult = await loadHTML(htmlFileName);
    const $ = cheerio.load(htmlResult);

    // * 2.操作HTML，插入内容
    // 插入controller动画逻辑
    // ! TODO 这里加载逻辑在npm全局模式下，引用路径有问题
    const bundleResult = await loadJs("controller.min.js");
    $("body").prepend(
      `<script type="text/javascript">${bundleResult}</script>`
    );
    // 将加载的json文件，动态在第一行插入  `window.animateJson = 动画json`
    $("body").prepend(
      `<script type="text/javascript">window.animateJson=${jsonResult}</script>`
    );
    // lottie动画DOM容器
    $("body").prepend(`<div id="lottie-wrapper"><div id="lottie"></div></div>`);
    $("head").append(
      `<style>#lottie-wrapper {position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: #fff;background-size: cover;z-index: 999999 !important;transition: all 1s;overflow: hidden;}#lottie {position: absolute;left: 50%;top: 50%;width: 50%;transform: translate(-50%, -50%);}</style>`
    );
    // lottie依赖库
    $("head").append(
      `<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js"></script>`
    );

    // * 3.输出修改后的HTML资源
    const htmlStr = $.html();
    // TODO 优化：输出到之前遍历获取的HTML路径
    const writeRes = await writeHTML(htmlFileName, htmlStr);
    console.log(writeRes);
  } catch (error) {
    console.log(error);
  }
})();
