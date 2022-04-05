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
const usersRouter = require("./routers/usersRouter");
const requestsRouter = require("./routers/requestsRouter");
// CONFIG VARS
const {MONGO_URI, PORT} = process.env;

// MIDDLEWARES 
app.use(express.json());
app.use(cookieParser());
// MONGODB
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

// ROUTES 
app.use("/login", loginRouter);
app.use("/register", registerRouter); 
app.use("/contacts", contactRouter);
app.use("/users", usersRouter);
app.use("/requests", requestsRouter);
// HOME PAGE 
app.get("/", (_req, res) => {
  res.send("Home page");
});
// LOGOUT 
app.get("/logout", (_req, res) => {
  res.clearCookie("jwt");
  res.json("You are logged out");
});

app.listen(PORT, () => console.log(`Listen port ${PORT}...`));