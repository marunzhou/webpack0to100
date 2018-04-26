"use strict"
const path = require('path');

module.exports = [
  {
    mode: 'development',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: './test2.js',
      // libraryTarget: 'amd',
    },
    entry: './src/pages/test2.js',
  },
  {
    mode: 'development',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: './dist-commonjs.js',
      libraryTarget: "commonjs",
      library: "MyLibrary",
    },
    entry: './src/pages/common.js',
  }
]