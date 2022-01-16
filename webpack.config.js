const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        static:['src/**/*.*'],
        compress: true,
        port: 9000,
      },
    output: {
        filename: 'app.js',
        path: __dirname + '/build',
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "style.css" }),
        new CopyPlugin({
           patterns: [
                { from: '**/*.html', context: 'src/',},
                { from: 'img/**/*', context: 'src/',},
           ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }, 
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }, 
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                },
            }
        ]
    },
    //regras de otimização/minificação
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new CssMinimizerPlugin(),
        ]
    },
}