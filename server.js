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

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  const serverConfig = require('./webpack/webpack-server.config');
  const serverCompiler = webpack(serverConfig);

  app.use(webpackDevMiddleware(serverCompiler, {
    publicPath: serverConfig.output.publicPath,
    stats: {
      colors: true
    }
  }));

  serverCompiler.plugin('done', () => {
    console.log("Clearing module cache from server");

    const id = path.resolve(__dirname, serverFile);

    delete require.cache[id];
  });
}
else {
  app.use(serveStatic('./build'));
}

app.use((req, res, next) => {
  return require(serverFile)(req, res, next);
});

app.listen(port, () => {
  console.log(`Node.js app is running at http://${host}:${port}/`);
});

