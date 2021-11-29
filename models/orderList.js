const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    order: { type: Schema.Types.ObjectId, required: true, ref: "Order" },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  {
    collection: "order_list", //อ้างให้ตรงกับ collection ใน DB
  }
);

const OrderList = mongoose.model("OrderList", schema);

module.exports = OrderList;
