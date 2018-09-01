var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://vDesignStudio:ggvlad1995!@ds135952.mlab.com:35952/vdstudio';

const connect = mongoose.connect(URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const accountSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    level: Number,
    player_name: String,
    player_color: String,
    player_position: {
        x: Number,
        y: Number,
        z: Number
    },
    current_date: String
});

const saveAccounttoDB = function (first_name, last_name, email, password) {
    var model = mongoose.model('Registration', accountSchema);
    var account = model({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        level: 0,
        player_name: "-",
        player_color: "White",
        player_position: {
            x: 0,
            y: 0,
            z: 0
        },
        current_date: Date.now()
    }).save(function (err) {
        if (err) return handleError(err);
    });
}

const getCollections = (email, password) => {
    let canNavigate;
    return new Promise(function (resolve, reject) {
        MongoClient.connect(URL, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject(err);
            } else {
                var dbo = db.db("vdstudio");
                dbo.collection("registrations").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(canNavigate = checkAvailability(email, password, result) ? true : false)
                });
            }
        });
    });
};

const checkAvailability = (email, password, result) => {
    let canNavigate = false;
    result.forEach(element => {
        if (element['acount_info']['email'] === email && element['acount_info']['password'] === password) {
            canNavigate = true;
        }
    });
    return canNavigate;
}

module.exports.getCollections = getCollections;
module.exports.URL = URL;
module.exports.connect = connect;
module.exports.accountSchema = accountSchema;
module.exports.saveAccounttoDB = saveAccounttoDB;