"use strict"
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    test: './src/pages/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    hashDigestLength: 8, // 设置 [hash] [chunkhash] 的长度
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  // 将图片也打包到dist中才可以正常显示图片
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 6000,
            name: 'images/[name].[hash:8].[ext]',
          }
        }]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ]

};