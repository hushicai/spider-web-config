
import webpack from 'webpack';
import webpackClientConfig from './webpack-client.config.js';
import webpackServerConfig from './webpack-server.config.js';

const webpackConfig = [webpackClientConfig, webpackServerConfig];

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig[0].stats));
      return resolve();
    });
  });
}

export default bundle;
