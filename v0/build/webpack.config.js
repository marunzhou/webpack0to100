"use strict"
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/pages/test.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundled.js'
  }
};