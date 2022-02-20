const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    tel: { type: String },
    address: { type: String },
    image_name: { type: String },
    image_url: { type: String },
  },
  {
    timestamps: true,
    collection: "customers", //อ้างให้ตรงกับ collation ใน DB
  }
);

//encryptPassword
schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(5); // genSalt เอาไปผสมกับ password ให้ยากขึ้น
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

//decryptPassword
schema.methods.decryptPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password); //this.password คือ field ที่อยู้ใน DB
  return isValid;
};

const Customer = mongoose.model("Customer", schema);

module.exports = Customer;
