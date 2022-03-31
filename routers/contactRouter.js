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

// GET LIST OF USER'S CONTACTS WITH QUERY PARAMS
router.get("/", isLoggedIn, async (req, res) => {
  let queryKeys = Object.keys(req.query);
  if (queryKeys.length === 0) {
    const user = await User.findById(req.data.id).populate("contacts");
    console.log(typeof user.contacts)
    return res.json({data: user.contacts, nb: user.contacts.length});
  } 
  const contacts = await Contact.find({userId: req.data.id, ...req.query}).setOptions({ sanitizeFilter: true });
  return res.json({data: contacts, nb: contacts.length});
});
// ADD A CONTACT 
router.post("/add", isLoggedIn, async (req, res) => {
  let contact;
  try {
    contact = await Contact.create({
      userId: req.data.id, ...req.body
    });
    // add contact in user contacts 
    await User.findOneAndUpdate({_id: req.data.id}, {$push: { contacts: contact.id }});
  } catch (err) {
    return res.status(401).json({message: err});
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
// DELETE A CONTACT 
router.delete("/del/:id", isLoggedIn, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.data.id, { "$pull": {"contacts": req.params.id}});
  } catch (err) {
    return res.status(400).json({message: err});
  }
  res.json({message: "Contact was removed"});
});


module.exports = router;