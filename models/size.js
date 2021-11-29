const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    title: { type: String, required: true },
    data_sort: { type: String, required: true },
  },
  {
    collection: "size", //อ้างให้ตรงกับ collection ใน DB
  }
);

const Size = mongoose.model("Size", schema);

module.exports = Size;
