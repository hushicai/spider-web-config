/**
 * @file server
 * @author hushicai(bluthcy@gmail.com)
 */

const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const {host, port} = require('./settings');
const app = express();
const serverFile = './build/server';
const assetsFile = './build/assets';

app.use(bodyParser.urlencoded({extended: true}));

// test or development
if (process.env.NODE_ENV !== 'production') {
  require('source-map-support').install();

  const path = require('path');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('./webpack/webpack-client.config');
  const compiler = webpack(config);

  const clientDevMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    serverSideRender: true
  });
  const clientHotMiddleware = webpackHotMiddleware(compiler);

  app.use(clientDevMiddleware);
  app.use(clientHotMiddleware);

  const serverConfig = require('./webpack/webpack-server.config');
  const serverCompiler = webpack(serverConfig);
  const serverDevMiddleware = webpackDevMiddleware(serverCompiler, {
    publicPath: serverConfig.output.publicPath,
    stats: {
      colors: true
    }
  });

  app.use(serverDevMiddleware);

  serverCompiler.plugin('done', () => {
    console.log("Clearing module cache from server");

    const id = require.resolve(serverFile);
    const assets = require.resolve('./build/assets');

    delete require.cache[id];
    delete require.cache[assets];
  });
}
else {
  app.use(serveStatic('./build'));
}

app.use((req, res, next) => {
  // 这里可以确保构建已经完成
  const assets = require(assetsFile);

  res.assets = assets.main;

  return require(serverFile)(req, res, next);
});

const server = app.listen(port, () => {
  console.log(`Node.js app is running at http://${host}:${port}/`);
});

