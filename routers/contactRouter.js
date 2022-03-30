const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const secret = process.env.SERVER_CODE;

router.get("/", async (req, res) => {
  let data;
  try {
    data = jwt.verify(req.cookies.jwt, secret);
  } catch (err) {
    return res.status(401).json({
      message: "Your token is not valid",
    });
  }
  res.json({
    message: "Your request is accepted",
    data,
  });
});

module.exports = router;