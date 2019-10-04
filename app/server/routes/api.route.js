var express = require('express');
var router = express.Router();
var fecApi = require('./api/fec.route');

router.use('/fecApi', fecApi);

module.exports = router;