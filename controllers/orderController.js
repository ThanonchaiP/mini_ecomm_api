const Order = require("../models/order");
const OrderList = require("../models/orderList");
const CartList = require("../models/cartList");

exports.index = async (req, res, next) => {
  const orders = await Order.find().populate("customer", "_id name");

  res.status(200).json({
    data: orders,
  });
};

exports.checkOut = async (req, res, next) => {
  const { id } = req.params;
  const { product, total } = req.body;

  let addOrder = await new Order({
    status: "success",
    customer: id,
    qty: total.totalQty,
    price: total.totalPrice,
  });
  await addOrder.save(); //save to db

  for (let p of product) {
    let addOrderList = await new OrderList({
      product: p.Product._id,
      order: addOrder._id,
      price: p.price,
      amount: p.amount,
    });
    await addOrderList.save();
  }

  const cart = await CartList.deleteMany({ customer: id });

  res.status(200).json({
    data: "คำสั่งซื้อสำเร็จ",
  });
};
