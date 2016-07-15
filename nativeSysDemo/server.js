var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var exec = require('child_process').exec,
    child;
var serverConfig = {
    port: 8890,
    host: 'localhost',
    dec_index: './view/index.html'
};
//webpack热启动
var webpackConfig = config.init(serverConfig);
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}).listen(webpackConfig.port, webpackConfig.host, function (err, result) {
    if (err) {
        console.log(err);
    }
     //port 可以是8890，也可以是8090等其他
    //浏览器启动
    browserSync.init({
        port: webpackConfig.port,
        host: webpackConfig.host,
        server: {
            baseDir: "./" + webpackConfig.p_path,
            index: webpackConfig.dec_index

        }
    });
    //exec('open "'+webpackConfig.p_url+'"');

    console.log('Listening at localhost:' + webpackConfig.port + ",按ctrl＋c  stop");

});

