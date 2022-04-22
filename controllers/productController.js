const Product = require("../models/product");
const SizeOption = require("../models/size_option");
const mongoose = require("mongoose");

exports.index = async (req, res, next) => {
  const { page, pageSize, sex, type, size } = req.query;
  const myPage = page ? parseInt(page) : 1;
  const myPageSize = pageSize ? parseInt(pageSize) : 10;

  const productType = type?.split(",");
  const products = await Product.find({
    $or: [{ type: "625e5b670826b76c7acceed8" }, { name: "Just Do It" }],
  });
  // const products = await Product.find({ type: "625e5b670826b76c7acceed8", name: "Just Do It" });
  // const products = await Product.find();
  // const query = {};
  // if (sex) {
  //   query.sex = { $regex: new RegExp(sex), $options: "i" };
  // }

  // const options = {
  //   sort: { type: -1 },
  //   lern: true,
  //   customLabels: { docs: "product" },
  //   page: myPage,
  //   limit: myPageSize,
  // };
  // mongoose.Types.ObjectId('61a45efd2cde4080aec28943')
  // const products = await Product.paginate(query, options);

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
