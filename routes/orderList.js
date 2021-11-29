const express = require("express");
const router = express.Router();
const orderListController = require("../controllers/orderListController");

/* GET home page. */
router.get("/", orderListController.index);

module.exports = router;
