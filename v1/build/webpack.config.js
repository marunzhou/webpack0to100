"use strict"
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    test1: './src/pages/test1.js',
    test2: './src/pages/test2.js',
    test3: './src/pages/test3.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    hashDigestLength: 8, // 设置 [hash] [chunkhash] 的长度
    filename: '[id].[name].[chunkhash].js'
  }
};