const Customer = require("../models/customer");
const { validationResult } = require("express-validator");

exports.registerCustomer = async (req, res, next) => {
  try {
    const { name, email, password, tel, address } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error; //โยนไปที่ catch
    }

    //check email ว่ามีอยู่ในระบบหรือไม่
    const alredyEmail = await Customer.findOne({ email: email });
    if (alredyEmail) {
      const error = new Error("อีเมลนี้มีผู้ใช้งานแล้ว");
      error.statusCode = 409;
      throw error; //โยนไปที่ catch
    }

    let customer = new Customer();
    customer.name = name;
    customer.email = email;
    customer.password = await customer.encryptPassword(password);
    customer.tel = tel ? tel : null;
    customer.address = address ? address : null;
    // admin.photo = config.DOMAIN + "images/" + (await saveImageToDisk(photo));
    await customer.save(); //save to db

    res.status(201).json({
      message: "เพิ่มข้อมูลสำเร็จ",
    });
  } catch (error) {
    next(error); //to middleware error
  }
};
