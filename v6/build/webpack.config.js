"use strict"
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    test: './src/pages/index.js',
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    hashDigestLength: 8, // 设置 [hash] [chunkhash] 的长度
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,

    proxy: [
      {
        context: ["/axios_post"],
        target: "http://localhost:8888",
      },
      {
        context: ["/goodsh5/goodsinfodata"],
        target: "http://mllmtest.com/emall",
      },
    ]
    // {
    //   "/goodsh5/goodsinfodata": {
    //     target: 'http://mllmtest.com/emall',
    //   }
    // },
  },

  // 将图片也打包到dist中才可以正常显示图片
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
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: [
            {
              css: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true,
                    sourceMap: true
                  }
                }
              ],
              scss: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true,
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    minimize: true,
                    sourceMap: true
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'upgrade htmlWebpackPlugin',
      template: './src/pages/index.html',
      inject: true,
    })
  ]

};