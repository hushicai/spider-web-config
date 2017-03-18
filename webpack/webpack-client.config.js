/**
 * @file webpack config client
 * @author hushicai(bluthcy@gmail.com)
 */

var config = require('./webpack.config');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var isDebug = process.env.NODE_ENV !== 'production';

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
      isDebug ? {
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
    ...isDebug ? [] : [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false
    })
  ]
});

module.exports = clientConfig;;
