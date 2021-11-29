const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    status: { type: String },
    qty: { type: Number },
    price: { type: Number },
  },
  {
    timestamps: true,
    collection: "orders", //อ้างให้ตรงกับ collection ใน DB
  }
);

const Order = mongoose.model("Order", schema);

module.exports = Order;
