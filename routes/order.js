const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/* GET home page. */
router.get("/", orderController.index);
router.post("/checkout/:id", orderController.checkOut);

module.exports = router;
