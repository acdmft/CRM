const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

// ROUTERS 
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");

app.use(express.json());
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

app.listen(8001, () => console.log("Listen port 8001..."));