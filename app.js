const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

//import middleware
const errorHandler = require("./middleware/errorHandler");

const customerRouter = require("./routes/customer");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/order");
const orderListRouter = require("./routes/orderList");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

const app = express();
app.use(cors());

//init passport
app.use(passport.initialize());

mongoose.connect("mongodb+srv://abc123:123@mycluster.c4w6r.mongodb.net/ecomm?retryWrites=true&w=majority");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/list", orderListRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.use(errorHandler);

module.exports = app;
