## lottie-helper

一键在你的 HTML 中加入首屏 Loading 动画。



## 教程

只需在你的 `.HTML` 同级目录，执行如下命令：

```shell
npx lottie-helper lohelp
```

即可为你的 HTML 添加首屏 Lottie 动画！ 





## 资源

[Lottie-Park](https://callbackhell.xyz/lottie-park/)， 提供了丰富的自定义动画类型 [持续更新中...] ，一键复制，粘贴在命令中即可！

[Lottie-park访问地址](https://callbackhell.xyz/lottie-park/)



**资源使用示例：**

> /lottie-json/118336-please-wait.json是从 Lottie-Park 中复制的<lottie-JSON-URL>

```shell
npx lottie-helper lohelp -j /lottie-json/118336-please-wait.json
```







## 配置

一键自定义想要的 Lottie 动画内容！

> 自定义的动画资源可在[【资源】](#资源)标题中查找。

- `-j`

  可自定义插入的 Lottie 动画类型 

  ```shell
  npx lottie-helper lohelp -j <lottie-JSON-URL>
  ```





## feature

- 可随意重复执行`npx lottie-helper lohelp`，插件会自动帮你初始化改动！

- 技术栈无关，只关心你最终的HTML资源变动！

- 将`npx lottie-helper lohelp`加在你的编译脚本之后，即可自动化添加首屏动画！

  ```shell
  vue-cli-service build && npx lottie-helper lohelp
  ```

  






## TODO

- inquirer，控制台箭头操作，常用交互式命令行用户界面的集合

