const Size = require("../models/size");

exports.index = async (req, res, next) => {
  const result = await Size.find();

  res.status(200).json({
    data: result,
  });
};
