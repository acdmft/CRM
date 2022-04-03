const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// MODELS 
const User = require("../models/userModel");
// MIDDLEWARE
const isLoggedIn = require("../middlewares/isLogged");
const reqDate = require("../middlewares/reqDate");
const recReq = require("../middlewares/recReq");

// GET USERS THAT ARE ONLINE (LAST REQUEST LESS THAN 1 MINUTE)
router.get("/online", isLoggedIn, reqDate, recReq, async (req, res) => {
  let users;
  try {
    users = await User.find({lastRequest: {$gte: new Date(Date.now() - 1000*180 )}}).select("-password");
  } catch (err) {
    return res.json({message: err});
  }
  res.json({data: users});
});

module.exports = router;