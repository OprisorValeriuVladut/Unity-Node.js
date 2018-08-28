var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + 'index.html');
});

app.listen(3000);
console.log('You are listening to port 3000');