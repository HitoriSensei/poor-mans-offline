var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: '#sourcemap',
  entry: [
      './src/app/index'
  ],
  output: {
      path: path.join(__dirname,'dist/app'),
      filename: 'index.js',
      publicPath: '/app/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ]
  }
};
