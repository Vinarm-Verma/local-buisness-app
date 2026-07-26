const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const bcrypt = require("bcryptjs");
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });
    res.json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    res.status(400).json({ message: "Signup failed", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
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
    res.status(400).json({ message: "Login failed", error: error.message });
  }
});

router.get("/addresses/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.addresses || []);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch addresses", error: error.message });
  }
});

router.post("/addresses/:userId", async (req, res) => {
  try {
    const { label, fullAddress, phone } = req.body;
    const user = await User.findById(req.params.userId);
    user.addresses.push({ label, fullAddress, phone });
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(400).json({ message: "Failed to add address", error: error.message });
  }
});

router.delete("/addresses/:userId/:addressId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId
    );
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete address", error: error.message });
  }
});

module.exports = router;
