var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'sourcemap',
  entry: [
      './src/app/sw'
  ],
  output: {
      path: path.join(__dirname,'dist/app'),
      filename: 'sw.js',
      publicPath: '/app/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  }
};
