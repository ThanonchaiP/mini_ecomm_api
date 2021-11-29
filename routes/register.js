const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const registerController = require("../controllers/registerController");

/* GET home page. */
router.post(
  "/customer",
  [
    body("name").not().isEmpty().withMessage("กรูณากรอกชื่อ"),
    body("email").not().isEmpty().withMessage("กรูณากรอกอีเมล").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password").not().isEmpty().withMessage("กรูณากรอกรหัสผ่าน"),
  ],
  registerController.registerCustomer
);

module.exports = router;
