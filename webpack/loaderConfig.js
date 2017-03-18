const isDebug = process.env.NODE_ENV !== 'production';
const localIdentName = '[name]_[local]__[hash:base64:5]';

exports.cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: isDebug,
    modules: true,
    localIdentName: localIdentName
  }
};

exports.cssLoaderLocals= {
  loader: 'css-loader/locals',
  options: {
    modules: true,
    localIdentName: localIdentName
  }
};

exports.postcssLoader = {
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
};

exports.sassLoader = {
  loader: 'sass-loader',
  options: {}
};

exports.fileLoader = {
  loader: 'file-loader',
  options: {}
};

exports.urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 1024,
    name: 'img/[name].[hash:8].[ext]'
  }
};
