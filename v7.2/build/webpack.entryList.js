"use strict"
// 安装 cross-env 给 script 命令下赋值变量
// 获取src/pages 下的项目 运行项目根据我们
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pagesUrl = './src/pages/' + process.env.PACKAGE_ENV + '/**/index.js';
const entries = glob.sync(pagesUrl)
const entryJsList = {}
const entryHtmlList = []
for (let path of entries) {
  let chunkName = path.slice('./src/pages/'.length, -'/index.js'.length)

  entryJsList[chunkName] = path;
  entryHtmlList.push(new HtmlWebpackPlugin({
    template: path.replace('index.js', 'index.html'),
    filename: chunkName + '/index.html', // 没有这段无法分出多个多层目录访问
    // chunks: [chunkName,'vendor','common','manifest'],
    // chunksSortMode: 'dependency',
    inject: true,
  }))
}
exports.entryJsList = entryJsList;
exports.entryHtmlList = entryHtmlList;