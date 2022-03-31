const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// MODELS
const User = require("../models/userModel");
const Contact = require("../models/contactModel");

const secret = process.env.SERVER_CODE;


// MIDDLEWARE 
function isLoggedIn(req, res, next) {
  let data;
  try {
    data = jwt.verify(req.cookies.jwt, secret);
  } catch (err) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  req.data = data;
  next();
}

// GET LIST OF USER'S CONTACTS
router.get("/", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.data.id).populate("contacts");
  res.json({data: user.contacts, nb: user.contacts.length});
});
// ADD A CONTACT 
router.post("/add", isLoggedIn, async (req, res) => {
  let contact;
  try {
    contact = await Contact.create({
      userId: req.data.id, ...req.body
    });
  } catch (err) {
    return res.status(401).json({message: err});
  }
  // add contact in user contacts 
  try {
    await User.findOneAndUpdate({_id: req.data.id}, {$push: { contacts: contact.id }});
  } catch (err) {
    return res.json(401).json({message: err});
  }
  res.status(201).json({message: "Contact added", data: contact});
});

// UPDATE A CONTACT WITH PUT 
router.put("/upd/:id", isLoggedIn, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
  } catch (err) {
    return res.json({message: "Contact updated"});
  }
  res.json({message: "Contact updated"});
});

module.exports = router;