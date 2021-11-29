const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const passportJWT = require("../middleware/passportJWT");

/* GET home page. */
router.post("/", loginController.loginCustomer);
router.get("/profile", [passportJWT.isLogin], loginController.profile);

module.exports = router;
