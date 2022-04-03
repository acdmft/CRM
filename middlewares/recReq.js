const mongoose = require("mongoose");
// REQUEST MODEL 
const Request = require("../models/requestModel");

// RECORD THE REQUEST INFO (URL, USERID, VERB, DATE)
async function recReq(req, res, next) {
  try {
    await Request.create({
      url: `${req.baseUrl}${req.url}`,
      verb: req.method,
      date: new Date(),
      user_id: req.data.userId 
    });
  } catch (err) {
    return res.status(400).json({message: err});
  }
  next();
}

module.exports = recReq;