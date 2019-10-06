var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

function db_connect() {
    mongoose.connect('mongodb://localhost/fec', { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    return (db);
}

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    birthday: Date,
    gender: Number,
    gender_specified: String,
    address: String,
    zip: Number,
    city: String,
    username: String,
    loginDate: { type: Date, default: Date.now() }
});
var User = mongoose.model('User', userSchema);

exports.getUser = async function (req, res) {
    try {
        var db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
        db.once('open', function (success) {
            var collection = db.collection('users');
            var docs = collection.find({ email: req.query.userEmail }).toArray(function (err, docs) {
                var passwd = docs[0]['password'];
                docs[0]['password'] = '';
                if (docs.length > 0) {
                    return (res.status(202).json({
                        status: 200,
                        message: "",
                        data: docs[0]
                    }))
                }
            })
        });
    }
    catch (e) {
        throw Error(e);
    }
}
exports.addUser = async function (req, res) {
    try {
        var db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
        db.once('open', function (success) {
            var collection = db.collection('users');
            var docs = collection.find({ email: req.body.email }).toArray(function (err, docs) {
                if (docs.length == 0) {
                    var newUser = new User({
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email,
                        password: req.body.password,
                        birthday: req.body.birthday,
                        gender: req.body.gender,
                        gender_specified: req.body.gender_specified,
                        address: req.body.address,
                        zip: req.body.zip,
                        city: req.body.city,
                        username: req.body.username
                    })
                    newUser.save(function (err, data) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            console.log('Saved : ', data);
                            return (res.status(200).json({
                                status: 200,
                                message: "User added successfully",
                                success: 1
                            }));
                        }
                    })
                }
                else {
                    return (res.status(200).json({
                        status: 200,
                        message: "This email already exists in our database.",
                        success: 0
                    }));
                }
            })
        })
    }
    catch (e) {
        throw Error(e);
    }
}
exports.fetchUserAndCookies = async function (req, res) {
    try {
        var db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
        db.once('open', function (success) {
            var collection = db.collection('users');
            var message = "";
            var docs = collection.find({ email: req.body.email }).toArray(function (err, docs) {
                if (docs.length == 0) {
                    return (res.status(202).json({
                        status: 200,
                        message: "No user found.",
                        loggedIn: 0
                    }))
                }
                if (docs[0]['password'] === req.body.password) {
                    var userCookies = docs[0]['cookies'];
                    if (userCookies)
                        message = "Cookies fetched successfully";
                    else
                        message = "User connected";
                    return (res.status(202).json({
                        status: 202,
                        message: message,
                        userCookies: userCookies,
                        loggedIn: 1
                    }))
                }
                else {
                    return (res.status(202).json({
                        status: 202,
                        message: "Email and Password combination doesn't work.",
                        loggedIn: 0
                    }))
                }
            })
        });
    }
    catch (e) {
        throw Error(e);
    }
}
exports.saveUserCookies = async function (req, res) {
    try {
        var userCookies = req.body.userCookies;
        var db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
        db.once('open', function (success) {
            var collection = db.collection('users');
            var docs = collection.find({ email: userCookies.username }).toArray(function (err, docs) {
                if (docs.length >= 1) {
                    userID = docs[0]['_id'];
                    collection.updateOne({ _id: ObjectId(userID) }, { $set: { cookies: userCookies } }, function (err, result) {
                        return (res.status(202).json({
                            status: 202,
                            message: '',
                            userUpdated: result
                        }))
                    })
                }
            })
        })
    }

    catch (e) {
        throw Error(e);
    }
}