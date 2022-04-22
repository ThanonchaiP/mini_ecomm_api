const express = require("express");
const router = express.Router();
const sizeController = require("../controllers/sizeController");

/* GET home page. */
router.get("/", sizeController.index);

module.exports = router;
