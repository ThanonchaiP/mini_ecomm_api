const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    sex: { type: String },
  },
  {
    collection: "products", //อ้างให้ตรงกับ collection ใน DB
  }
);

schema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", schema);

module.exports = Product;
