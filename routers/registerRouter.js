const express = require("express");
const { create } = require("../models/userModel");
const router = express.Router();
// USER MODEL 
const User = require("../models/userModel");

router.get("/", (req, res) => {
  res.json({message: "register router"});
});

// POST A USER 
router.post("/", async (req, res) => {
  try {
    await User.create(req.body);
  } catch(err) {
    return res.json({message: err})
  }
  res.status(201).json({message: "User created"});
});

module.exports = router;