const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const cookieParser = require("cookie-parser");

// ROUTERS 
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");
const contactRouter = require("./routers/contactRouter");

// MIDDLEWARES 
app.use(express.json());
app.use(cookieParser());
// MONGODB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

// ROUTES 
app.use("/login", loginRouter);
app.use("/register", registerRouter); 
app.use("/contacts", contactRouter);
// LOGOUT 
app.get("/logout", (_req, res) => {
  res.clearCookie("jwt");
  res.json("You are logged out");
});

app.listen(8001, () => console.log("Listen port 8001..."));