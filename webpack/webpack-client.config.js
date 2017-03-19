/**
 * @file webpack config client
 * @author hushicai(bluthcy@gmail.com)
 */

const config = require('./webpack.config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const merge = require('webpack-merge');
const {isDev, isTest, isProd, isDebug} = require('./env');
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
    new AssetsPlugin({
      path: config.output.path,
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x, null, 2)};`,
    }),
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
