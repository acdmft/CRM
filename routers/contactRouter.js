const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const secret = process.env.SERVER_CODE;


// MIDDLEWARE 
function isLoggedIn(req, res, next) {
  let data;
  try {
    data = jwt.verify(req.cookies.jwt, secret);
  } catch (err) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  req.data = data;
  next();
}

router.get("/", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.data.id).populate("contacts");

  res.json({data: user.contacts, nb: user.contacts.length});
});

module.exports = router;