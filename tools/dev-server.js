
import webpack from 'webpack';
import webpackServerConfig from '../config/webpack-server.config';

const _build = (config) => new Promise((resolve, reject) => {
  webpack(config, (err, stats) => err ? reject(err) : resolve());
});

function startDevServer() {
  return _build(webpackServerConfig);
}

export default startDevServer;
