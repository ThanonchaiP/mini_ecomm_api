const ProductType = require("../models/productType");

exports.index = async (req, res, next) => {
  const result = await ProductType.find();

  res.status(200).json({
    data: result,
  });
};
