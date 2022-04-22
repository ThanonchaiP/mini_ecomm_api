const express = require("express");
const router = express.Router();
const productTypeController = require("../controllers/productTypeController");

/* GET home page. */
router.get("/", productTypeController.index);

module.exports = router;
