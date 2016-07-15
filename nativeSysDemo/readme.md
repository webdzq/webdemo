
项目简介：

组成：webpack+react+es6＋antd＋router＋redux+css-modules+less+git+gitlab+docker<br/>

实现内容：<br/>
一 webpack使用到的Plugin组件:<br/>
1 HtmlWebpackPlugin<br/>
功能:html处理.包括压缩,去注释,hash,导入js/css,cdn路径替换等<br/>
参考文献:http://www.cnblogs.com/haogj/p/5160821.html<br/>

2 CommonsChunkPlugin<br/>
功能:公共模块的提取<br/>
文献:http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin<br/>
3 ExtractTextPlugin<br/>
功能:独立打包样式文件,然后在页面中以<link>标签引入<br/>
文献:https://www.npmjs.com/package/extract-text-webpack-plugin<br/>
4 HotModuleReplacementPlugin<br/>
功能:模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要页面刷新.<br/>
文献:https://segmentfault.com/a/1190000003872635?utm_source=tuicool&utm_medium=referral<br/>
5 NoErrorsPlugin<br/>
功能:配置了NoErrorsPlugin插件，用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误：<br/>

文献:<br/>
6 ProvidePlugin<br/>
功能:全局别名<br/>
文献:<br/>
7 UglifyJsPlugin<br/>
功能:代码压缩/混淆<br/>
文献:<br/>
8 OccurenceOrderPlugin<br/>
功能:模块排序<br/>
二 webpack使用到的loader组件:<br/>
1 html<br/>
2 png/jpg/gif base64<br/>
3 css css-modules less<br/>
4 js jsx<br/>
5 babel<br/>
三 webpack 多文件目录输出<br/>

四 clean及server<br/>
 描述:使用node编写或者使用webpack的CleanWebpackPlugin和OpenBrowserPlugin,BrowserSyncPlugin<br/>
 文献:https://github.com/johnagan/clean-webpack-plugin,http://www.imooc.com/article/7221,<br/>
 https://github.com/baldore/open-browser-webpack-plugin<br/>
五 es6<br/>
文献:http://es6.ruanyifeng.com/<br/>
六 react reactnative<br/>
文献:http://reactjs.cn,http://reactnative.cn<br/>
七  react-router<br/>
文献:https://github.com/reactjs/react-router,http://www.uprogrammer.cn/react-router-cn/<br/>
八  redux react-redux<br/>
文献:http://cn.redux.js.org,<br/>
    https://leozdgao.me/reacthe-reduxde-qiao-jie-react-redux/<br/>
    https://github.com/reactjs/react-redux,<br/>
    http://www.open-open.com/lib/view/open1446187220367.html<br/>
九  git<br/>
文献:http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/<br/>
十  gitlab<br/><br/>
文献:https://bbs.gitlab.cc<br/>

十一:npm scripts<br/>
文献;http://www.jianshu.com/p/3cf367c65e5f<br/>


svn路径:<br/>
http://svn2.yanxiu.com/yanxiu/yanxiu-fe/branches/nativeSysDemo<br/>
项目运行：<br/>
安装依赖包:<br/>

#>>npm install  (太慢请使用淘宝镜像)<br/>
全局安装webpack npm install webpack -g <br/>
开发环境:<br/>
#>>npm start<br/>
生产环境:<br/>
#>>npm deploy<br/>

待优化:<br/>
1 项目目录结构 (告别了函数式的js,迎来了面向对象的js),是否按照modules,router,redux,view,style结构设计.<br/>

2 前后端交互 .ajax,promis,fetch<br/>

3 是否首页服务端渲染.koa或express<br/>
4

issues:(问题集锦)<br/>
1 win系统下，antd样式引用有bug（在index.less中）未解决。<br/>



ps: 项目涉及新东西比较多.丰富到很多地方做取舍比较难.<br/>
这个算是一个公共项目，有问题即时提出，有能力的贡献想法，代码。逐步完善成一个very nice项目。希望能给大家带了提升<br/>
