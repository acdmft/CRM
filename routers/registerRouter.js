const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({message: "register router"});
});

module.exports = router;