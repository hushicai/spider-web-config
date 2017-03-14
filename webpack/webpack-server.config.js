/**
 * @file webpack config server
 * @author hushicai(bluthcy@gmail.com)
 */

var config = require('./webpack.config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var isDebug = process.env.NODE_ENV !== 'production';
var nodeExternals = require('webpack-node-externals');

var serverConfig = merge(config, {
  name: "server",
  entry: [
    'webpack/hot/poll?1000',
    './server/app.js'
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
          {
            loader: 'css-loader/locals',
            options: {
              sourceMap: isDebug,
              modules: true,
              minimize: !isDebug
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ]
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  externals: [nodeExternals()],
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: []
});

module.exports = serverConfig;
