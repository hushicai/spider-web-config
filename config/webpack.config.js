/**
 * @file webpack config
 * @author hushicai(bluthcy@gmail.com)
 */

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const context = path.resolve(__dirname, '../src');

export const isDebug = !(process.env.NODE_ENV === 'production');

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  context: context,

  output: {
    path: path.resolve(__dirname, '../build/'),
    publicPath: '/',
    sourcePrefix: '  '
  },

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isDebug,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            // Latest stable ECMAScript features
            // https://github.com/babel/babel/tree/master/packages/babel-preset-latest
            'latest',
            // Experimental ECMAScript proposals
            // https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0
            'stage-0',
            // JSX, Flow
            // https://github.com/babel/babel/tree/master/packages/babel-preset-react
            'react',
            ...isDebug ? [] : [
              // Optimize React code for the production build
              // https://github.com/thejameskyle/babel-react-optimize
              'react-optimize',
            ],
          ],
          plugins: [
            'transform-runtime',
            ...!isDebug ? [] : [
              // Adds component stack to warning messages
              // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-source
              'transform-react-jsx-source',
              // Adds __self attribute to JSX which React will use for some warnings
              // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
              'transform-react-jsx-self',
            ],
            ['import', {"libraryName": "antd", "style": 'css'}]
          ],
        }
      },
      isDebug ? {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                  })
                ]
              }
            }
          },
          'sass-loader'
        ]
      } :{
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // CSS Loader https://github.com/webpack/css-loader
                sourceMap: isDebug,
                // CSS Modules https://github.com/css-modules/css-modules
                modules: true,
                // CSS Nano http://cssnano.co/options/
                minimize: !isDebug
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('precss'),
                    require('autoprefixer')({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                    })
                  ]
                }
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
          limit: 10000,
        },
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json'],
  },

  plugins: [
    ...isDebug ? [] : [
      new ExtractTextPlugin('app.css')
    ],
    new webpack.LoaderOptionsPlugin({
      debug: isDebug
    })
  ],

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,

  stats: {
    colors: true,
    reasons: isDebug
  }
};

export default config;
