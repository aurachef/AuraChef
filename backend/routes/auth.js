const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure you have this model
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use environment variable in production


router.post("/signup", async (req, res) => {
  console.log("🔹 Received signup request:", req.body); // Log request data

  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      console.log("❌ Missing fields in request body");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUserWithemail = await User.findOne({ email });
    if (existingUserWithemail) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ message: "Email already in use" });
    }// Check if user exists
    const existingUserWithUserName = await User.findOne({ username });
    if (existingUserWithUserName) {
      console.log("❌ Username already exists:", email);
      return res.status(400).json({ message: "Username already in use" });
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



router.post("/login", async (req, res) => {
  console.log("🔹 Received login request:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found with email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    console.log("✅ Login successful, token generated for:", email);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
