const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

exports.loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check username ว่ามีอยู่ในระบบหรือไม่
    const customer = await Customer.findOne({ email: email });
    if (!customer) {
      const error = new Error("ไม่พบผู้ใช้งานนี้ในระบบ");
      error.statusCode = 404;
      throw error; //โยนไปที่ catch
    }

    //ตรวจสอบรหัสผ่าน
    const isValid = await customer.decryptPassword(password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }

    //สร้าง token
    const token = await jwt.sign(
      {
        id: customer._id, //เป็นข้อมูลที่เก็บไว้ใน token
      },
      config.JWT_SECRET,
      { expiresIn: "5 days" }
    ); //expiresIn วันหมดอายุ

    //decode วันหมดอายุ
    const expires_in = jwt.decode(token);

    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
    });
  } catch (error) {
    next(error); //to middleware error
  }
};

//get profile
exports.profile = async (req, res, next) => {
  return res.status(200).json({
    user: req.user,
  });
};
