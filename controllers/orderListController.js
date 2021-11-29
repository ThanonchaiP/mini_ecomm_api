const OrderList = require("../models/orderList");

exports.index = async (req, res, next) => {
  const orderList = await OrderList.find().populate("product").populate("order");

  res.status(200).json({
    data: orderList,
  });
};
