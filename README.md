# webpack0to100
webpack零配置开始

webpack 是什么？
官网概念：
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
菜鸟上这么写定义：
Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。
我：
打包js，打包style，打包image，在打包中附加处理功能【image转base64，es6转es5，sass转css】，并整理出目录 mainfest，方便你查找。

webpack 能做什么？

简单的来说，webpack 专注做一件事，便是打包资源。但又是不单一的打包资源，在此过程，他还提供了不同的 loader 为你处理不同的文件，转化为你需要的文件格式，例如images 转 base64，es6转es5， sass 转为 css。

打包好了，但是这么多的文件都放到了一起，一定很不好找，怎么办呢？它们的依赖关系需要一个目录吧，就像看一本书，你起码要知道书中的内容，才知道你要的内容在哪一页，这时候 manifest.js 就充当了目录这个角色了【注：你可以发现，webpack打包总会生成 manifest 这么个文件，而且必须引入到页面上】。

那打包是怎么样的呢？

1.最直的打包就是 I/0，输入输出，结束，简单到不敢想像。 [起始 v0]
webpack4 需要你设置 mode: development || production 根据你的环境进行设置即可，
不设置会报如下错误：
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

2.第二步就来玩玩多入口配置打包吧。[v1]
先简单的来说，主要是了解 entry 多入口配法，另外 output 的 filename，[id] [name]  [chunkhash] 代表的值基本就差不多过了。
当然，这里还有个很重要的属性 output.publicPath 涉及资源加载路径的问题，后续讲到再补充吧。


遗留疑问：
output 章节观看中，library

3.热加载配置[v2]


npm run uninstall webpack-dev-server -g [出现can not find module 'webpack/bin/yarn-config' 时，先删除再安装，这是与webpack版本兼容出现的问题]
npm run install webpack-dev-server -g

// webpack.config.js

module.exports = {
   devServer: {
       contentBase: path.join(__dirname, "dist"),
       compress: true,
       port: 9000
   },
}
运行命令：webpack-dev-server --config ./build/webpack.config.js

4.文件匹配规则
【v3.1 图片处理】

npm run install file-loader --save-dev
npm run install url-loader --save-dev
需要移动到文件时，file-loader必不可少，url-loader可以帮你把图片转为base64


// webpack.config.js

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


【v3.2 sass及css处理】

npm run install style-loader --save-dev
npm run install css-loader --save-dev

style-loader 做什么？css-loader做什么？
操作一，我只用了css-loader 但是页面没有加载 css ，只有将 style-loader 也添加上才可以显示出样式。
操作二，只用 style-loader 解析会失败，单纯的 css 文件，style-loader 无法解析，需要 css-loader 处理后才可以解析。


module: {
       rules: [
           {
               test: /\.css$/,
               use: [
                   'style-loader',
                   {
                       loader: 'css-loader',
                       options: {
                           minimize: true
                       }
                   }
               ]
           },
       ]
},

运行代码时，你会遇到 Cannot find module 'node-sass' ，安装它就可以了

npm install node-sass --save-dev -D


module:{
    rules: [
                      {
                          test: /\.scss$/,
                           use: [
                               'style-loader',
                               'css-loader',
                               'sass-loader'
                           ]
                       }
   ]
}

【v3.3 js 优化处理】
据webpack 4 新特性介绍，已根据mode，分开 development 和 production ，自动做了优化处理。



5.集成vue[v4]

①安装vue 和 loader

npm install vue --save-dev
npm install vue-loader --save-dev

②配置 vue-loader 解析 .vue 文件

module: {
    rules: [
       {
           test: /\.vue$/,
           loader: 'vue-loader',
       }
   ]
}

页面引入 vue 运行时发现报了一个错

给 vue 设个 alias 换个解析路径就可以了

resolve: {
   alias: {
       'vue': 'vue/dist/vue.js',
   }
},

③vue页面 sass 的解析 [https://vue-loader.vuejs.org/zh-cn/configurations/pre-processors.html]

// vue page
<template></template>
<script></script>
<style lang="scss">
    body{
       background: #eee;
   }
</style>


// webpack.config.js

module: {
    rules: [
       {
           test: /\.vue$/,
           loader: 'vue-loader',
           options: [
               {
                   css: [
                       'vue-style-loader',
                       {
                           loader: 'css-loader',
                           options: {
                               minimize: true,
                               sourceMap: true,
                           }
                       }
                   ],
                   scss: [
                       'vue-style-loader',
                       {
                           loader: 'css-loader',
                           options: {
                               minimize: true,
                               sourceMap: true,
                           }
                       },
                       {
                           loader: 'sass-loader',
                           options: {
                               minimize: true,
                               sourceMap: true,
                           }
                       }
                   ]
               }
           ]
       }
   ]
}


6.升级一下 htmlwebpackPlugin 的配置[v5]

new HtmlWebpackPlugin({
title: 'upgrade htmlWebpackPlugin',
template: './src/pages/index.html',
inject: true,
})

7.最简单的资源都有了初步的处理，那么接下来应该是配代理了 proxy [v6]
配了代理，这样调试接口就方便多了，一切都为了更简便的开发为目标

devServer: {
   // ...

    proxy: [{
       context: ["axios_post"],
       target: "http://localhost:8888",
   }]

}

8.参照 vue-cli完成一个手动多入口可配置的例子
开始先安装 cross-env 方便我们运行cli时传参，运行命令如下：

cross-env PACKAGE_ENV=pro1 MODEL_ENV=dev webpack-dev-server --config ./build/webpack.config.js

[v7.1] 多入口配置
使用了 vue-cli 的 webpack.entryList.js 文件

[v7.2] 图片及样式资源打包路径问题
我的资源分两种，一种存放在 static 目录下（static 存在全部项目的公用资源），另一种则是存放在各个项目下的私有资源。
最终打包是想放到 dist/assets 下
dist
|—proName
|——pageName
|———index.html
|—assets
|——images
|———proName
|——css
|———proName
|——libs
|———proName

①配置 output.publicPath 让dev模式下的图片可以显示， 同时添加上[v3.1]的图片处理规则

output: {
   publicPath: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9000/',
}

配完 publicPath 开发环境下基本都可以正常开发了
②第二步我们要让打包的资源按我们的目录去存放，这里得分开开发环境和生产环境，留个备份，复制一份到[v7.3]进行操作

[v7.3] 图片及样式资源打包路径问题之区分开发和生产环境，整理为可配置的项，重构的过程

安装 webpack-merge 用于我们的webpack配置合并使用

npm install webpack-merge --save-dev

新建
dev-server.js 开发环境启动文件
build.js 生产环境启动文件
webpack.base.config.js 两个环境都用到的基本配置项

[config/dev.env.js]
开发环境我们是基本 webpack-dev-server 的，所以主要的配置为 derSever .

[config/pro.env.js]
生产环境开发项的配置

[config/local.config.js]
配置一些经常需要修改的配置项如端口号

[config/proxy.config.js]
配置你联调需要用到的接口链接

将webpack.config.js 拆分为：
build.js - 生产打包文件
dev-server.js - 开发环境运行文件
webpack.base.config.js - 两个环境公用的配置项
webpack.entryList.js - 入口文件路径获取
webpack.pro.config.js - 生产环境配置项
webpack.dev.config.js - 开发环境配置项

拆分完后，再添加了 extract-text-webpack-plugin 分离样式文件到单独文件中
使用时遇到一个报错 Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
运行，新安装了后，解决问题

npm i -D extract-text-webpack-plugin@next


// webpack.pro.config.js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module: {
   rules: [
   
          {
                   test: /\.css$/,
                   use: ExtractTextPlugin.extract({
                   fallback: "style-loader",
                   use: {
                           loader: 'css-loader',
                           options: {
                           minimize: true
                   }
               }
           })
       },

   ]
},

plugins: [
   new ExtractTextPlugin("assets/css/styles.css"),
]

接下来配置 babel
配置参考网址： https://blog.csdn.net/u012443286/article/details/79577545

最后 postcss-babel 的配置
这里参考来配置：https://mp.weixin.qq.com/s/9uR2uQt47Tt5pVsTiw07jw
因为这是为一个移动端项目搭建的项目。


3升到4遇到的问题解决方案参考：https://blog.csdn.net/qq_16559905/article/details/79404173

eg1.library 库的试验，没成功试出应用场景【library-example】
参考 webpack中library和libraryTarget使用场景：http://www.zhufengpeixun.com/qianduanjishuziliao/Nodejishuziliao/2017-01-17/694.html
library的说明，是为npm安装类提供方便快捷的调用方式，具体有待尝试，暂不深究



参考文档：
http://www.css88.com/doc/webpack/guides/author-libraries/
https://doc.webpack-china.org
