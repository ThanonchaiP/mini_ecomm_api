const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    size: { type: Schema.Types.ObjectId, required: true, ref: "Size" },
    qty: { type: Number, required: true },
  },
  {
    collection: "size_options", //อ้างให้ตรงกับ collection ใน DB
  }
);

const SizeOption = mongoose.model("SizeOption", schema);

module.exports = SizeOption;
