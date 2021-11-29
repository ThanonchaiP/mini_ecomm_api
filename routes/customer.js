const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const cartController = require("../controllers/cartController");

/* GET home page. */
router.get("/", customerController.index);
router.get("/cart/:id", cartController.getCartById);
router.put("/cart/:id", cartController.updateQty);
router.delete("/cart/:id", cartController.deleteItemFromCart);

module.exports = router;
