var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //webpack插件

//console.log("prod..",process.env.NODE_ENV);
//console.log("prod..", process.argv.splice(2).join(''));
//var atgvs = process.argv.splice(2).join('');
//var env = atgvs.indexOf('prod');

var glob = require('glob'); // glob模块，用于读取webpack入口目录文件
var p_path = "dist";
var p_url = "http://localhost:8890/";
//默认参数
var default_config = {
    port: 8890,
    p_url: p_url, //服务地址
    p_path: p_path, //发布目录
    src_index: './src/js/page/index.js', //入口
    filename: 'js/[name].js', //打包后的文件
    chunkFilename: 'js/[id].chunk.js', //缓存块
    favicon: './src/img/favicon.ico',
    dec_index: './view/index.html', //打包后的启动文件
    template: './src/view/index.html',
    exp_loaders: [], //加载器
    exp_plugins: [] //插件
};
var getEntry = function (opt) {
    var entry = {};
    var entry_prod = {
        index: [opt.config.p_url,
            opt.config.src_index
        ],
        vendor: ['react', 'jquery', 'antd']
    };
    return entry_prod;
};
webpackConfig = {
    init: function (opt) {
        //可以修改默认参数
        var opt = Object.assign(default_config, opt);
        default_config = opt;
        return opt;
    },
    devtool: 'source-map',
    entry: getEntry({
        config: default_config,
        root: '',
        bash: ''
    }),
    output: {
        path: path.join(__dirname, default_config.p_path),
        publicPath: default_config.p_url + default_config.p_path,
        filename: default_config.filename,
        chunkFilename: default_config.chunkFilename
    },
    resolve: {
        root: [process.cwd() + '/src', process.cwd() + '/node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [ //加载器
            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot', 'jsx?harmony', 'babel'],
                exclude: /node_modules/,
                //include: [path.join(__dirname, 'js')]
            }, {
                test: /\.(css|less)$/,
                //exclude: /node_modules/,
                exclude: [/node_modules/, path.resolve(__dirname, 'src/css/common')],
                //loader:"style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]!autoprefixer-loader!less-loader"
                loader: ExtractTextPlugin.extract("style-loader",
                    "css-loader?modules&importLoaders=1&localIdentName=[local]!autoprefixer-loader!less-loader"
                )
            },

            {
                test: /\.html$/,
                loader: "html"
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            },

        ].concat(default_config.exp_loaders)
    },
    plugins: [
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: default_config.favicon, //favicon路径
            filename: default_config.dec_index, //生成的html存放路径，相对于 path
            template: default_config.template, //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        }),
        //new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.ProvidePlugin({ //加载jq
            $: 'jquery'
        }),
        new ExtractTextPlugin("css/[name].css"), //单独使用style标签加载css并设置其路径
        new webpack.optimize.UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ].concat(default_config.exp_plugins)

};


module.exports = webpackConfig;
