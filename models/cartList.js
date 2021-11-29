const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    size: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    collection: "cart_list", //อ้างให้ตรงกับ collection ใน DB
  }
);

const CartList = mongoose.model("CartList", schema);

module.exports = CartList;
