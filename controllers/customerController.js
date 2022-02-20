const fs = require("fs");
const { saveImageToDisk } = require("../functions/image");
const config = require("../config/index");
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

exports.update = async (req, res, next) => {
  try {
    const { name, email, tel, address, password, new_password, image_name, image_base64 } = req.body;
    const { id } = req.params;

    //check email ซ้ำ
    const already = await Customer.findOne({ email: email });
    if (already && already.id !== id && already.email === email) {
      const error = new Error("อีเมลนี้มีผู้ใช้งานแล้ว");
      error.statusCode = 409;
      throw error; //โยนไปที่ catch
    }

    //change password && ตรวจสอบรหัสผ่าน
    if (password && new_password) {
      let hashNewPassword = undefined;
      const getPassword = await Customer.findById(id).select("password");
      const isValid = await getPassword.decryptPassword(password);
      if (!isValid) {
        const error = new Error("รหัสผ่านไม่ถูกต้อง");
        error.statusCode = 401;
        throw error;
      }
      hashNewPassword = await new Customer().encryptPassword(new_password);
      const updatePassword = await Customer.findByIdAndUpdate(id, {
        password: hashNewPassword,
      });
    }

    //check image
    let imgName = image_name ? image_name : "nopic.png";
    if (image_base64) {
      //delete image from disk
      if (imgName !== "nopic.png" && imgName !== "nopic.jpg") {
        fs.unlinkSync(`${config.DOMAIN}/public/images/${imgName}`);
        // fs.unlinkSync(`${__dirname}/../public/images/${image_name}`);
      }
      imgName = await saveImageToDisk(image_base64);
    }

    const customer = await Customer.findByIdAndUpdate(id, {
      name: name,
      email: email,
      tel: tel,
      address: address,
      image_name: imgName,
      image_url: `${config.DOMAIN}/images/${imgName ? imgName : "nopic.png"}`,
    });

    if (customer.nModified === 0) {
      const error = new Error("ไม่สามารถแก่ไขข้อมูลได้");
      error.statusCode = 400;
      throw error;
    } else {
      const data = await Customer.findById(id).select("-password");
      res.status(200).json({
        status: 200,
        message: "แก้ไขข้อมูลสำเร็จ",
        data: data,
      });
    }
  } catch (error) {
    next(error); //to middleware error
  }
};
