const Customer = require("../models/customer");

exports.index = async (req, res, next) => {
  const customer = await Customer.find();

  res.status(200).json({
    data: customer,
  });
};

exports.insert = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //check email ซ้ำ
    const already = await Customer.findOne({ email: email });
    if (already) {
      const error = new Error("อีเมลนี้มีผู้ใช้งานแล้ว");
      error.statusCode = 409;
      error.validation = errors.array();
      throw error; //โยนไปที่ catch
    }

    let customer = new Customer();
    customer.name = name;
    customer.email = email;
    customer.password = customer.encryptPassword(password);
    await customer.save();

    res.status(201).json({
      message: "เพิ่มข้อมูลสำเร็จ",
    });
  } catch (error) {
    next(error); //to middleware error
  }
};
