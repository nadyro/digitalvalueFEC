var express = require('express');
var router = express.Router();
var fecConnectController = require("../../controllers/fec.controller");
var fecProfileController = require("../../controllers/fecprofile.controller");

router.post("/addUser", fecConnectController.addUser);
router.post("/fetchUserAndCookies", fecConnectController.fetchUserAndCookies);
router.post("/saveUserCookies", fecConnectController.saveUserCookies);

router.get("/getUser", fecProfileController.getUser);
router.put("/updateUser", fecProfileController.updateUser);

module.exports = router;