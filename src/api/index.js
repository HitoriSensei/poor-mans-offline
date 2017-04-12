var express = require('express')
var app = express()

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.post('/post', function (req, res) {
    res.send(JSON.stringify({}))
})

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})