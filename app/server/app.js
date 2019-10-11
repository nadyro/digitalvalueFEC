const cors = require('cors');
var express = require('express');
var createError = require('http-errors');
var app = express();
var http = require('http').createServer(app);
var api = require(__dirname + '/routes/api.route');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('views', path.join(__dirname, '/dist/'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', api);
// app.use(function (req, res, next) {
//     next(createError(404));
// });
app.use(express.static(__dirname + '/dist/'));
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
const PORT = process.env.PORT || 8081;
http.listen(PORT, function (request, response) {
    console.log(PORT);
    console.log("server is running");
});

module.exports = app;
