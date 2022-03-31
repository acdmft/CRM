const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  let data;
  try {
    data = jwt.verify(req.cookies.jwt, process.env.SERVER_CODE);
  } catch (err) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  req.data = data;
  next();
}

module.exports = isLoggedIn;