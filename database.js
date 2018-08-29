var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://vDesignStudio:ggvlad1995!@ds135952.mlab.com:35952/vdstudio';

const connect = mongoose.connect(URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const accountSchema = new mongoose.Schema({
    first_name : String,
    last_name: String,
    email: String,
    password: String
});

const saveAccounttoDB = function (first_name, last_name, email, password) {
    var model = mongoose.model('Registration', accountSchema);
    var account = model({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    }).save(function (err) {
        if (err) return handleError(err);       
    });
}

module.exports.MongoClient = MongoClient;
module.exports.URL = URL;
module.exports.connect = connect;
module.exports.accountSchema = accountSchema;
module.exports.saveAccounttoDB = saveAccounttoDB;