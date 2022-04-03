const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// MODELS
const User = require("../models/userModel");
const Contact = require("../models/contactModel");

const secret = process.env.SERVER_CODE;

// MIDDLEWARE 
const isLoggedIn = require("../middlewares/isLogged");
// INSERT REQUEST DATE IN THE USERS COLLECTION
const reqDate = require("../middlewares/reqDate");
// INSERT INFORMATION OF THE REQUEST IN THE REQUESTS COLLECTION
const recReq = require("../middlewares/recReq");

// GET LIST OF USER'S CONTACTS WITH QUERY PARAMS
router.get("/", isLoggedIn, reqDate, recReq, async (req, res) => {
  let queryKeys = Object.keys(req.query);
  if (queryKeys.length === 0) {
    const user = await User.findById(req.data.userId).populate("contacts");
    return res.json({data: user.contacts, nb: user.contacts.length});
  } 
  const contacts = await Contact.find({userId: req.data.userId, ...req.query}).setOptions({ sanitizeFilter: true });
  return res.json({data: contacts, nb: contacts.length});
});
// GET CONTACT BY ID
router.get("/id/:id", isLoggedIn, reqDate, recReq, async (req, res) => {
  let contact;
  try {
    contact = await Contact.findById(req.params.id); 
  } catch (err) {
    return res.status(400).json({message: err});
  }
  res.json({data: contact});
});
// ADD A CONTACT 
router.post("/add", isLoggedIn, reqDate, recReq, async (req, res) => {
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
router.put("/upd/:id", isLoggedIn, reqDate, recReq, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
  } catch (err) {
    return res.json({message: "Contact updated"});
  }
  res.json({message: "Contact updated"});
});
// DELETE A CONTACT 
router.delete("/del/:id", isLoggedIn, reqDate, recReq, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.data.id, { "$pull": {"contacts": req.params.id}});
  } catch (err) {
    return res.status(400).json({message: err});
  }
  res.json({message: "Contact was removed"});
});


module.exports = router;