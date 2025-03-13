const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Ensure you have this model
const router = express.Router();


router.post("/signup", async (req, res) => {
  console.log("🔹 Received signup request:", req.body); // Log request data

  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      console.log("❌ Missing fields in request body");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword });

    await newUser.save();
    console.log("✅ User saved successfully:", newUser);
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
