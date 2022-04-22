const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    collection: "product_type", //อ้างให้ตรงกับ collection ใน DB
  }
);

const ProductType = mongoose.model("ProductType", schema);

module.exports = ProductType;
