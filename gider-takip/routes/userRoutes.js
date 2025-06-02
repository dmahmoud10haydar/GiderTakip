const express = require('express');
const router = express.Router();
const User = require('../models/User');

//POST
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body); 
    await newUser.save();               
    res.status(201).json(newUser);      
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

//GET
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

