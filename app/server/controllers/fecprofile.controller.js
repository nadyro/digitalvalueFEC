var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

function db_connect() {
    mongoose.connect('mongodb://localhost/fec', { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    return (db);
}

exports.updateUser = async function (req, res) {
    try {
        var formData = req.body.formGroup;
        var cookies = req.body.cookies;
        var userCookies = req.body.userCookies;
        var db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
        db.once('open', function (success) {
            var changes;
            var collection = db.collection('users');
            var docs = collection.find({ email: cookies.username }).toArray(function (err, docs) {
                if (docs.length >= 1) {
                    if (docs[0]['password'] === formData.password) {
                        userID = docs[0]['_id'];
                        if (formData.new_password != '') {
                            changes = { email: formData.email, username: formData.username, password: formData.new_password };
                        }
                        else {
                            changes = { email: formData.email, username: formData.username };
                        }
                        collection.updateOne({ _id: ObjectId(userID) }, {
                            $set: changes
                        }, function (err, result) {
                            return (res.status(202).json({
                                status: 202,
                                message: 'Profile successfully modified.',
                                updated: 1
                            }))
                        });
                    }
                    else {
                        return (res.status(202).json({
                            status: 202,
                            message: 'Wrong password.',
                            updated: 2
                        }))
                    }
                }
                else {
                    return (res.status(202).json({
                        status: 202,
                        message: 'Something went wrong. Check your credentials.',
                        updated: 2
                    }))
                }
            })
        })
    }
    catch (e) {
        throw Error(e);
    }
}

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