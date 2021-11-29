const Product = require("../models/product");
const Size = require("../models/size");
const SizeOption = require("../models/size_option");
const mongoose = require("mongoose");

exports.index = async (req, res, next) => {
  let data = [];

  const products = await Product.find();

  for (const p of products) {
    const sizeop = await SizeOption.find({ product: p._id }).select("qty size -_id").populate("size");

    data.push({
      product: p,
      size_option: sizeop,
    });
  }

  res.status(200).json({
    data: data,
  });
};
