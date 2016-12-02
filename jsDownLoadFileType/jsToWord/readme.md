1,这个demo是使用js插件将js网页转换成word的功能<br/>
2，如果文档中有图片，需要使用canvas来转换。并将图片做如下设置：<br/>
var image = new Image();<br/>
image.crossOrigin = "Anonymous";<br/>

3,使用了Blob和canvas等h5的新特性。所有只能支持现代浏览器。<br/>
4，使用方法：下载node模块anywhere：[sudo] npm install anywhere -g ;（类似一个小型的web服务器）<br/>
5,命令行下当前目录:anywhere port(端口号，如8888，9999),之后会打开网页<br/>
