/**
 * @file webpack config
 * @author hushicai(bluthcy@gmail.com)
 */

var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');
var path = require("path");
var buildPath = path.resolve(__dirname, '../build');
var {isDev, isTest, isProd, isDebug} = require('./env');

var config = {
  context: path.resolve(__dirname, '../'),
  devtool: isDebug ? 'source-map': '',
  output: {
    path: buildPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {test: /\.png$/, loader: "url-loader" },
      {test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': isDev ? '"development"' : (isProd ? '"production"' : '"test"')
      }
    }),
    ...isDebug ? [
      new WriteFilePlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ] : []
  ]
};

module.exports = config;
