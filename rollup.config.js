

import { getBabelOutputPlugin, } from "@rollup/plugin-babel"; 
import json from '@rollup/plugin-json' // rollup不支持 .json文件的导入导出，故需要插件支持
import { terser } from "rollup-plugin-terser";

export default [{
  // 显示声明引入的外部依赖
  // https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
  external: ['minimist'], 
  input: "./src/index.js", // 打包入口
  output: [
    {
      // 打包出口
      file: "dist/bundle.js",
      format: "cjs", // 打包模式规范-cjs/commonJS  iife/浏览器  umd
      plugins: [
        getBabelOutputPlugin({
          presets: ["@babel/preset-env"],
        })
      ],
    },
    {
      // 打包出口
      file: "dist/bundle.min.js",
      format: "cjs", // 打包模式规范-cjs/commonJS  iife/浏览器  umd
      plugins: [
        getBabelOutputPlugin({
          presets: ["@babel/preset-env"],
        }),
        terser()
      ],
    },
  ],
  plugins: [json()]
}];
