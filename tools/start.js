/**
 * @file start
 * @author hushicai(bluthcy@gmail.com)
 */

import webpack from 'webpack'
import webpackMiddleware from 'webpack-middleware';
import webpackClientConfig from './webpack-client.config.js';
import webpackServerConfig from './webpack-server.config.js';
import webpackHotMiddleware from 'webpack-hot-middleware';
import browserSync from 'browser-sync';

import run from './run';
import clean from './clean';
import copy from './copy';
import runServer from './run-server';

const config = webpackClientConfig;
const webpackConfig = [webpackClientConfig, webpackServerConfig];

process.argv.push('--watch');

async function start() {
  await run(clean);
  await run(copy);
  await new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfig);
    const wpMiddleware = webpackMiddleware(bundler, {
      // IMPORTANT: webpack middleware can't access config,
      // so we should provide publicPath by ourselves
      publicPath: config.output.publicPath,

      // Pretty colored output
      stats: config.stats,

      // For other settings see
      // https://webpack.github.io/docs/webpack-dev-middleware
    });
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();

      const server = await runServer();
      const bs = browserSync.create();

      bs.init({
        ...(config.debug ? {} : { notify: false, ui: false }),

        proxy: {
          target: server.host,
          middleware: [wpMiddleware, hotMiddleware],
          proxyOptions: {
            xfwd: true,
          },
        },
      }, resolve);
    };

    bundler.plugin('done', stats => handleBundleComplete(stats));
  });
}

export default start;
