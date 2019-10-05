var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

function db_connect() {
    mongoose.connect('mongodb://localhost/fec', { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    return (db);
}

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String,
    loginDate: { type: Date, default: Date.now() }
});
var User = mongoose.model('User', userSchema);

exports.addUser = async function (req, res) {
    try {
        var params = req.body.formdata;
        var db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
        db.once('open', function (success) {
            var collection = db.collection('users');
            var message = "";
            var docs = collection.find({ username: params.email }).toArray(function (err, docs) {
                if (docs.length >= 1) {
                    var userCookies = docs[0]['cookies'];
                    if (userCookies)
                        message = "Cookies fetched successfully";
                    else
                        message = "User connected";
                    return (res.status(202).json({
                        status: 202,
                        message: message,
                        userCookies: userCookies
                    }))
                }
                else {
                    var newUser = new User({
                        username: params.email,
                        password: params.password
                    })
                    newUser.save(function (err, data) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            console.log('Saved : ', data);
                            return (res.status(200).json({
                                status: 200,
                                message: "User added successfully"
                            }));
                        }
                    })
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
            var docs = collection.find({ username: userCookies.username }).toArray(function (err, docs) {
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