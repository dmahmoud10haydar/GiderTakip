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



//GET
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    res.json({ message: "Kullanıcı başarıyla silindi", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;