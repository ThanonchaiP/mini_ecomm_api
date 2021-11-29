const CartList = require("../models/cartList");
const mongoose = require("mongoose");

exports.index = async (req, res, next) => {
  const cart = await CartList.find();

  res.status(200).json({
    data: cart,
  });
};

exports.getCartById = async (req, res, next) => {
  const { id } = req.params;
  let ObjectId = mongoose.Types.ObjectId(id);
  const cart = await CartList.aggregate([
    {
      $lookup: {
        from: "products", //collection name
        localField: "product", //field classroom in Advisor model
        foreignField: "_id", // foreign in Classroom model
        as: "Product",
      },
    },
    { $match: { customer: ObjectId } },
    {
      $unwind: "$Product",
    },
    {
      $project: {
        //select and delete some field
        product: 0,
        customer: 0,
      },
    },
  ]);
  const total = await CartList.aggregate([
    { $match: { customer: ObjectId } },
    { $group: { _id: null, amount: { $sum: "$amount" }, price: { $sum: "$price" } } },
    {
      $project: {
        //select and delete some field
        _id: 0,
      },
    },
  ]);

  res.status(200).json({
    data: cart,
    meta: total,
  });
};

exports.addToCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { product, amount, price, size } = req.body;
    const exist = await CartList.findOne({ customer: id, product: product, size: size });
    if (exist) {
      const cart = await CartList.updateOne(
        { _id: exist._id },
        {
          amount: exist.amount + amount,
          price: exist.price + price,
        }
      );
      if (cart.nModified === 0) {
        const error = new Error("ไม่สามารถเพิ่มข้อมูลได้");
        error.statusCode = 403;
        throw error;
      }
    } else {
      let add = await new CartList({
        customer: id,
        product: product,
        amount: amount,
        price: price,
        size: size,
      });
      await add.save(); //save to db
      if (add.nModified === 0) {
        const error = new Error("ไม่สามารถเพิ่มข้อมูลได้");
        error.statusCode = 403;
        throw error;
      }
    }
    res.status(201).json({
      message: "เพิ่มข้อมูลสำเร็จ",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllCart = async (req, res, next) => {
  const { id } = req.params;

  const cart = await CartList.deleteMany({ customer: id });

  res.status(200).json({
    message: "ลบข้อมูลสำเร็จ",
  });
};

exports.deleteItemFromCart = async (req, res, next) => {
  const { id } = req.params;
  const { product, size } = req.body;

  const cart = await CartList.deleteOne({ customer: id, product: product, size: size });

  res.status(200).json({
    message: "ลบข้อมูลสำเร็จ",
  });
};

exports.updateQty = async (req, res, next) => {
  const { id } = req.params;
  const { product, size, amount, price } = req.body;

  const cart = await CartList.findOneAndUpdate(
    { customer: id, product: product, size: size },
    {
      amount: amount,
      price: price,
    }
  );

  res.status(200).json({
    message: "อัพเดทข้ออมูลสำเร็จ",
  });
};
