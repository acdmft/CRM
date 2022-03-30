const express = require("express");
const router = express.Router();
// USER MODEL 
const User = require("../models/userModel");

router.get("/", (req, res) => {
  res.json({message: "login router"});
});

router.post("/", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ $and: [{ "email": req.body.email }, { "password": req.body.pwd }] }).populate("contacts"); 
  } catch(err) {
    return res.json({message: err});
  }
  res.json(user);
});

module.exports = router;