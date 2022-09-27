import fs from "fs";
import path from "path";

// 读取指定json文件
export const loadJson = async (fileName) => {
  try {
    console.log("loadJson running...");
    // TODO 容错，多种方式不局限于json文件引入
    return new Promise((resolve, reject) => {
      const filePath = path.join(process.cwd(), fileName);
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    //完成
  } catch (err) {
    Promise.reject(err);
  }
};

// 写入约定的json文件
export const writeJson = async (jsonData) => {
  try {
    console.log("writeJson running...");
    return new Promise((resolve, reject) => {
      fs.writeFile(`src/json/jsonAnimate.json`, jsonData, "utf-8", (err) => {
        if (err) return reject(err);
        resolve("write done");
      });
    });
    //完成
  } catch (err) {
    Promise.reject(err);
  }
};

// 读取指定HTML文件
export const loadHTML = async (fileName = "index.html") => {
  try {
    console.log("loadHTML running...");
    return new Promise((resolve, reject) => {
      const filePath = path.join(process.cwd(), fileName);
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    //完成
  } catch (err) {
    Promise.reject(err);
  }
};

// 读取指定目录的所有HTML文件
export const loadHTMLDir = async () => {
  try {
    console.log("loadHTMLDir running...");
    return new Promise((resolve, reject) => {
      const filePath = path.join(process.cwd());
      fs.readdir(filePath, "utf-8", (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    //完成
  } catch (err) {
    Promise.reject(err);
  }
};

// 写入约定的html文件
export const writeHTML = async (filePathName, HTMLStr) => {
  try {
    console.log("writeHTML running...");
    return new Promise((resolve, reject) => {
      const filePath = path.join(process.cwd(), filePathName);
      fs.writeFile(filePath, HTMLStr, "utf-8", (err) => {
        if (err) return reject(err);
        resolve("write done");
      });
    });
    //完成
  } catch (err) {
    Promise.reject(err);
  }
};

// 读取指定JS文件(bundle)
export const loadJs = async (fileName) => {
  try {
    console.log("loadJs running...");
    return new Promise((resolve, reject) => {
      // 在同dist目录下寻找打包后的js bundle
      const fullPath = path.join(__dirname, fileName);
      fs.readFile(`${fullPath}`, "utf-8", (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    //完成
  } catch (err) {
    Promise.reject(err);
  }
};
