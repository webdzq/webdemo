var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //webpack插件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var p_url = "http://localhost:8080/";
var config= {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?' + p_url,
        './src/app.js'
    ],
    output: {
        path: './dist',
        publicPath: "http://localhost:8080/dist/",
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080,
        contentBase: './dist', //定义静态服务器的基路径
        hot: true,
        historyApiFallback: true,
        publicPath: "",
        stats: {colors: true},
        plugins: [new webpack.HotModuleReplacementPlugin()]
    },

    module: {
        loaders: [

            {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=10000&name=images/[name].[ext]'},

            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot', 'jsx?harmony', 'babel'],
                exclude: /node_modules/

            },
            //{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: "style!css"},
            {test: /\.less/, loader: 'style-loader!css-loader!less-loader'}]
    },
    resolve: {
        extensions: ['', '.js', '.json', 'jsx']
    },

    plugins: [

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
        }),
        new CleanWebpackPlugin(['dist', 'build']),

        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        new OpenBrowserPlugin({url: 'http://localhost:8080'})

    ]
};
module.exports= config;

