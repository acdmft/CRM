const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function reqDate(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.data.id, {
      $set: { lastRequest: new Date(Date.now()) },
    });
  } catch (err) {
    return res.json({ message: err });
  }
  next();
}

module.exports = reqDate;
