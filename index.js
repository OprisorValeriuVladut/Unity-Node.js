var express = require('express');

var app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 5000)
console.log('You are listening to port 5000');