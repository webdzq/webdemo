var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //webpack插件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: [
        './src/app.js'
    ],
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    devServer: {
        port: 8090,
        contentBase: './dist', //定义静态服务器的基路径
        hot: true,
        historyApiFallback: true,
        publicPath: "",
        stats: {colors: true},
        plugins: [new webpack.HotModuleReplacementPlugin()]
    },

    module: {
        loaders: [

            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=10000&name=./img/[name].[ext]'
            },

            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot', 'jsx?harmony', 'babel'],
                exclude: /node_modules/

            }, {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
               // exclude: [/node_modules/, path.resolve(__dirname, 'src/css/common')],
                //loader:"style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]!autoprefixer-loader!less-loader"
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
            //{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            //{test: /\.css$/, loader: "style!css"},
            //{test: /\.less/, loader: 'style-loader!css-loader!less-loader'}

        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', 'jsx']
    },

    plugins: [

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist', 'build']),
        new webpack.ProvidePlugin({ //加载jq
            $: 'jquery'
        }),
        new ExtractTextPlugin("[name].css"), //单独使用style标签加载css并设置其路径
        new webpack.NoErrorsPlugin(),


        new OpenBrowserPlugin({url: 'http://localhost:8090'})

    ]
};


