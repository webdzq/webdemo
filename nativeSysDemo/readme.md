
项目简介：

组成：webpack+react+es6＋antd＋router＋redux+css-modules+less+git+gitlab+docker<br/>

实现内容：<br/>
一 webpack使用到的Plugin组件:<br/>
1 HtmlWebpackPlugin<br/>
功能:html处理.包括压缩,去注释,hash,导入js/css,cdn路径替换等<br/>
参考文献:http://www.cnblogs.com/haogj/p/5160821.html<br/>

2 CommonsChunkPlugin
功能:公共模块的提取
文献:http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
3 ExtractTextPlugin
功能:独立打包样式文件,然后在页面中以<link>标签引入
文献:https://www.npmjs.com/package/extract-text-webpack-plugin
4 HotModuleReplacementPlugin
功能:模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要页面刷新.
文献:https://segmentfault.com/a/1190000003872635?utm_source=tuicool&utm_medium=referral
5 NoErrorsPlugin
功能:配置了NoErrorsPlugin插件，用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误：

文献:
6 ProvidePlugin
功能:全局别名
文献:
7 UglifyJsPlugin
功能:代码压缩/混淆
文献:
8 OccurenceOrderPlugin
功能:模块排序
二 webpack使用到的loader组件:
1 html
2 png/jpg/gif base64
3 css css-modules less
4 js jsx
5 babel
三 webpack 多文件目录输出

四 clean及server
 描述:使用node编写或者使用webpack的CleanWebpackPlugin和OpenBrowserPlugin,BrowserSyncPlugin
 文献:https://github.com/johnagan/clean-webpack-plugin,http://www.imooc.com/article/7221,
 https://github.com/baldore/open-browser-webpack-plugin
五 es6
文献:http://es6.ruanyifeng.com/
六 react reactnative
文献:http://reactjs.cn,http://reactnative.cn
七  react-router
文献:https://github.com/reactjs/react-router,http://www.uprogrammer.cn/react-router-cn/
八  redux react-redux
文献:http://cn.redux.js.org,
    https://leozdgao.me/reacthe-reduxde-qiao-jie-react-redux/
    https://github.com/reactjs/react-redux,
    http://www.open-open.com/lib/view/open1446187220367.html
九  git
文献:http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/
十  gitlab
文献:https://bbs.gitlab.cc

十一:npm scripts
文献;http://www.jianshu.com/p/3cf367c65e5f


svn路径:
http://svn2.yanxiu.com/yanxiu/yanxiu-fe/branches/nativeSysDemo
项目运行：
安装依赖包:

#>>npm install  (太慢请使用淘宝镜像)
开发环境:
#>>npm start
生产环境:
#>>npm deploy

待优化:
1 项目目录结构 (告别了函数式的js,迎来了面向对象的js),是否按照modules,router,redux,view,style结构设计.

2 前后端交互 .ajax,promis,fetch

3 是否首页服务端渲染.koa或express
4

issues:(问题集锦)
1 win系统下，antd样式引用有bug（在index.less中）未解决。



ps: 项目涉及新东西比较多.丰富到很多地方做取舍比较难.
这个算是一个公共项目，有问题即时提出，有能力的贡献想法，代码。逐步完善成一个very nice项目。希望能给大家带了提升
