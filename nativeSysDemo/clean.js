//文件目录清理
var p_path = "dist";
var webpack = require('webpack');
var config = require('./webpack.config');
var exec = require('child_process').exec,
    child;
var webpackConfig = config.init();

console.log('clear path :' + webpackConfig.p_path + ",按ctrl＋c  stop");


function clean() {
    //清除目录
    child = exec('rm -rf ' + webpackConfig.p_path, function (err, out) {

        err && console.log(err);
        console.log("clean...",out);
        //webp();

    });
}
function  webp(){
    exec('webpack - --progress --colors', function (err, out) {
        err && console.log(err);
        console.log('webpack ok!',out);
        server();

    });
}
function server(){
    exec('node server', function (err,out) {
        err && console.log(err);
        console.log('server  ok!',out);

    });
}

clean();
