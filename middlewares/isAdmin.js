const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function isAdmin(req, res, next) {
  let data = jwt.verify(req.cookies.jwt, process.env.SERVER_CODE);
  if (!data.isAdmin && req.body.isAdmin) {
    return res.status(403).json({message: "Permission denied (not admin)"});
  } 
  next();
}

module.exports = isAdmin;