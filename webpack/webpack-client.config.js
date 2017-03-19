/**
 * @file webpack config client
 * @author hushicai(bluthcy@gmail.com)
 */

var config = require('./webpack.config');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var {isDev, isTest, isProd, isDebug} = require('./env');
const {cssLoader, postcssLoader, sassLoader} = require('./loaderConfig');
const entry = ['./client/app.js'];

if (isDebug) {
  entry.unshift('webpack-hot-middleware/client?reload=true');
}

var clientConfig = merge(config, {
  name: "browser",
  target: 'web',
  entry: entry,
  output: {
    filename: "client.js",
  },
  module: {
    rules: [
      isDev ? {
        test: /\.scss$/,
        use: [
          'style-loader',
          cssLoader,
          postcssLoader,
          sassLoader
        ]
      } : {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            cssLoader,
            postcssLoader,
            sassLoader
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('client.css'),
    ...isProd ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ] : []
  ]
});

module.exports = clientConfig;;
