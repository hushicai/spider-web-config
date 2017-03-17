/**
 * @file server
 * @author hushicai(bluthcy@gmail.com)
 */

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import {host, port} from './common/config';

const app = express();
const isDebug = process.env.NODE_ENV !== 'production';

if (isDebug) {
  const webpack = require('webpack');
  const config = require('./webpack/webpack-client.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);

  const cssModulesRequireHook = require('css-modules-require-hook');
  const sass = require('node-sass');

  cssModulesRequireHook({
    generateScopedName: '[name]_[local]__[hash:base64:5]',
    extensions: ['.scss'],
    preprocessCss: (css, filename) => {
      return sass.renderSync({
        data: css,
        file: filename
      }).css;
    }
  });

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  const chokidar = require('chokidar');
  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watcher = chokidar.watch(['./common', './server', './client']);

  watcher.on('ready', function() {
    console.log('Ready for changes')
    watcher.on('all', function() {
      console.log("Clearing module cache from server");
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\](server|client|common)[\/\\]/.test(id)) {
          console.log('Clearing', id);
          delete require.cache[id];
        }
      });
    });
  });

  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  // compiler.plugin('done', function() {
    // console.log("Clearing `client` module cache from server");
    // Object.keys(require.cache).forEach(function(id) {
      // if (/[\/\\]client[\/\\]/.test(id)) {
        // delete require.cache[id];
      // }
    // });
  // });
}

app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  return require('./server/routes')(req, res, next);
});

app.listen(port, () => {
  console.log(`Node.js app is running at http://${host}:${port}/`);
});

