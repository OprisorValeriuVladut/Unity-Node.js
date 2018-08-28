var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(bodyParser.json());
 
 mongoose.connect('mongodb://vDesignStudio:ggvlad1995!@ds135952.mlab.com:35952/vdstudio', { useNewUrlParser: true });
 var registerSchema = new mongoose.Schema({
     name: String,
     email: String,
     password: String
 });
 
 function saveAccounttoDB(name, email, password){
    var model = mongoose.model('Registration', registerSchema);
    var itemOne = model({
        name: name,
        email: email,
        password: password
    }).save(function(err){
        if (err) return handleError(err);
        console.log('account saved');
    });
 }

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/register', function(req, res){
    res.sendFile(__dirname + '/register.html');
});  

app.post('/register-success', function(req, res){
    saveAccounttoDB(req.body.name, req.body.email, req.body.password);
});  


app.listen(process.env.PORT || 5000)
console.log('You are listening to port 5000'); 