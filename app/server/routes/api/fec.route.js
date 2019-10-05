var express = require('express');
var router = express.Router();
var apiConnectController = require("../../controllers/fec.controller");

router.post("/addUser", apiConnectController.addUser);
router.post("/fetchUserAndCookies", apiConnectController.fetchUserAndCookies);
router.post("/saveUserCookies", apiConnectController.saveUserCookies);
module.exports = router;