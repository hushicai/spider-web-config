/**
 * @file webpack config server
 * @author hushicai(bluthcy@gmail.com)
 */

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');
var merge = require('webpack-merge');
var isDebug = process.env.NODE_ENV !== 'production';
var nodeExternals = require('webpack-node-externals');

const {cssLoaderLocals, sassLoader, urlLoader} = require('./loaderConfig');
// const styleCollectorLoader = path.resolve(__dirname, '../tools/styleCollectorLoader');

urlLoader.options.emitFile = false;

var serverConfig = merge(config, {
  name: "server",
  entry: [
    // relative to `context`
    './server/routes.js'
  ],
  target: "node",
  output: {
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // {
            // loader: styleCollectorLoader
          // },
          cssLoaderLocals,
          sassLoader
        ]
      },
      {
        test: /\.jpe?g|png|gif$/,
        use: [
          urlLoader
        ]
      }
    ]
  },
  externals: [nodeExternals()],
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true
    })
  ]
});

module.exports = serverConfig;
