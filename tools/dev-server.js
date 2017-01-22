/**
 * @file dev server
 * @author hushicai(bluthcy@gmail.com)
 */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackClientConfig from '../config/webpack-client.config.js';
import serveIndex from 'serve-index';
import serveStatic from 'serve-static';

const buildDir = path.resolve(__dirname, '../build');

function startDevServer() {
  const app = express();
  const compiler = webpack(webpackClientConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackClientConfig.output.publicPath,
    stats: webpackClientConfig.stats
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use(serveStatic(buildDir));
  app.use(serveIndex(buildDir));

  return new Promise((resolve, reject) => {
    app.listen(4000, function () {
      console.log('dev server started at http://localhost:4000');
      resolve();
    });
  });
}

export default startDevServer;
