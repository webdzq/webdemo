# API组件示例wpy版本-微信小程序版本20170111

## 开发须知
1. 安装node，安装wepy 。
    `npm install wepy-cli -g`
2. 安装依赖包：
    `npm install`
3. 运行命令编译成小程序代码。生成目录`dist`
    开发调试命令：`npn run dev`
    发布测试命令：`npn run bulid`
    上线使用微信小程序命令工具发布到后台审核
4. 下载微信开发者工具，并打开项目下的dist目录。`APPID=`.

5. 点击【项目】去掉`es6转es5`的选项。点击【动作】里的【刷新】。然后点击【调试】。
6. 下载开发IDE工具vscode，并安装插件：`wpy-beautify`，`Vue 2 Snippets`,`vscode wxml`等。并在首选项【设置】里配置：
```json
 "files.associations": {
        "*.vue": "vue",
        "*.wpy": "vue",
        "*.wxml": "html",
        "*.wxss": "css"
    },
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html"
    },
```
7. 开发目录是`src`。使用文件后缀`.wpy`。类似`vue`。
8. 结构目录主要是`components`，`images`，`mixins`，`pages`。尽量模块化，样式class使用业务模块名起头，`-`分割。
9. 详细的代码开发技能需要修炼小程序语法，vue语法，wepy开发规范等。
## issues 
1. <navigator>中url的问题。如果是`wepy.component`中使用，url路径是父级page页面的相对路径。
2. `wx:for`和`@tap`最好不要同时出现在一个view标签里
3. `video`中`wepy.createVideoContext('myVideo')`创建视频对象失败。可以使用`wx.createVideoContext('myVideo')`。
4. 默认wepy===wx。但是并不如此。所以系统函数最好使用wx来调用。为了绕过eslint语法检查，需要在.eslintrc.jsz中配置

```json
"globals": {
        "wx": true,
    },
```
5. 如果有很多事件需要动态注册，无法注入到`methods`并生效。只能注册到`this.$wxpage`上，参考`canvas`示例。如果要使用原生app，请用`this.$wxapp.`等同于`getApp()`
## 参考文档
[wpy开发文档](https://wepyjs.github.io/wepy/)
[小程序开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html?t=2017327)
[VUE开发文档](https://cn.vuejs.org/v2/guide/index.html)


