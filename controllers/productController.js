const Product = require("../models/product");
const Size = require("../models/size");
const SizeOption = require("../models/size_option");
const mongoose = require("mongoose");

exports.index = async (req, res, next) => {
  const { page, pageSize } = req.query;
  const myPage = page ? parseInt(page) : 1;
  const myPageSize = pageSize ? parseInt(pageSize) : 10;

  const options = {
    sort: { type: -1 },
    lern: true,
    customLabels: { docs: "product" },
    page: myPage,
    limit: myPageSize,
  };

  const products = await Product.paginate({}, options);

  res.status(200).json({
    data: products,
  });
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  let data;

  const product = await Product.findById(id);
  // const sizeOp = await SizeOption.find({ product: product._id }).select("qty size -_id").populate("size");
  const sizeOp = await SizeOption.aggregate([
    {
      $lookup: {
        from: "size",
        localField: "size",
        foreignField: "_id",
        as: "size",
      },
    },
    {
      $project: {
        _id: 0,
        "size._id": 0,
        "size.data_sort": 0,
      },
    },
    { $match: { product: product._id } },
    {
      $sort: {
        "size_option.size.data_sort": -1,
      },
    },
  ]);

  data = {
    product: product,
    size_option: sizeOp,
  };

  res.status(200).json({
    data: data,
  });
};

