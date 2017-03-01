const { resolve, join } = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    repo: './repo.entry.js',
  },
  output: {
    publicPath: '/',
    path: __dirname,
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].[id].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, use: ['raw-loader'] },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      resolve(join(__dirname, '../node_modules')),
      'node_modules'
    ]
  }
};
