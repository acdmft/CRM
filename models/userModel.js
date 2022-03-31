const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: 6,
  },
  contacts: [{ type: mongoose.Types.ObjectId, ref: "Contact" }],
  isAdmin: {
    type: String,
    default: false
  } 

});

const User = mongoose.model("User", userSchema);

module.exports = User;