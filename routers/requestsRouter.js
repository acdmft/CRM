const express = require("express");
const router = express.Router();

// MIDDLEWARE 
const isLoggedIn = require("../middlewares/isLogged");

// REQUEST MODEL 
const Request = require("../models/requestModel");

// GET STATISTIC OF THE REQUESTS 
router.get("/stats", isLoggedIn, async (req, res) => {
  let req_urls;
  try { 
    req_urls = await Request.aggregate([
      {
        $group: {
          _id: '$url',
          count: { $sum: 1 }
        }
    }]);
    req_urls.sort((d1, d2) => d2.count - d1.count );
  } catch (err) {
    return res.status(400).json({message: err});
  }
  res.json({ nbRequests: req_urls.length, mostUsedURL: req_urls});
});

module.exports = router;