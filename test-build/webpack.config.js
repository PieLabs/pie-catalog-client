module.exports = {
  context: __dirname,
  entry: './entry.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
    publicPath: '../test-build/'
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
  }
}