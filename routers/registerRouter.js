const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
// USER MODEL
const User = require("../models/userModel");
// MIDDLEWARES
const isAdmin = require("../middlewares/isAdmin");

const secret = process.env.SERVER_CODE;

router.get("/", (req, res) => {
  res.json({ message: "register router" });
});

// POST A USER
router.post("/", isAdmin, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  res.status(201).json({ message: "User created" });
});

module.exports = router;
