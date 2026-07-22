const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// SIGNUP route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    res.json({ message: 'User created successfully', userId: newUser._id });

  } catch (error) {
    res.status(400).json({ message: 'Signup failed', error: error.message });
  }
});

// LOGIN route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({
      token: token,
      user: { id: user._id, name: user.name, role: user.role }
    });

  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;