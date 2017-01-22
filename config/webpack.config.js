/**
 * @file webpack config
 * @author hushicai(bluthcy@gmail.com)
 */

import path from 'path';

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  __is_debug: isDebug,
  __is_verbose: isVerbose,

  context: path.resolve(__dirname, '../src'),

  output: {
    path: path.resolve(__dirname, '../build/'),
    publicPath: '/',
    sourcePrefix: '  ',
    pathinfo: isVerbose,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
        ],
        query: {
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
          ],
        },
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            // CSS Loader https://github.com/webpack/css-loader
            sourceMap: isDebug,
            minimize: !isDebug
          })}`,
          'postcss-loader'
        ]
      },
      {
        test: /\.scss/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            // CSS Loader https://github.com/webpack/css-loader
            sourceMap: isDebug,
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            // CSS Nano http://cssnano.co/options/
            minimize: !isDebug
          })}`,
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
          limit: 10000,
        },
      },
    ],
  },

  resolve: {
    root: path.resolve(__dirname, '../src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,
  debug: isDebug,

  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  postcss(bundler) {
    return [
      require('precss'),
      require('autoprefixer')({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ];
  },
};

export default config;
