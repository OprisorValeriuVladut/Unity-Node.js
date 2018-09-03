var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./database.js');
var socket = require('./socket.js');

socket.socketInit();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/home', function (req, res) {
    res.render('index');
});

app.get('/register', function (req, res) {
    res.render('register');
});

app.get('/dashboard', function (req, res) {
    res.sendFile(__dirname + '/dashboard.html');
});

app.get('/register-success', function (req, res) {
    res.render('register-success');
});

app.post('/register-success', function (req, res) {
    db.saveAccounttoDB(req.body.first_name, req.body.last_name, req.body.email, req.body.password);
    res.render('register-success');
});

app.post('/login', function (req, res) {
    let redirectBool;
    db.getCollections(req.body.email, req.body.password).then(function (result) {
        res.render(result ? 'dashboard' : 'register');
    });
});


app.listen(process.env.PORT || 5000)
console.log('You are listening to port 5000'); 