var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.app.dev');
var path = require('path');


new WebpackDevServer(webpack(config),
    {
        publicPath: '/app/',
        contentBase: path.join(__dirname,'dist'),
        hot: true
    }).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at 0.0.0.0:3000');
});
