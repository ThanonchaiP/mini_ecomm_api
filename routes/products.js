const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const passportJWT = require("../middleware/passportJWT");

/* GET home page. */
// router.get("/", [passportJWT.isLogin], productController.index);
router.get("/", productController.index);
router.get("/:id", productController.getById);
router.post("/cart/add/:id", cartController.addToCart);
router.delete("/cart/:id", cartController.deleteAllCart);

module.exports = router;
