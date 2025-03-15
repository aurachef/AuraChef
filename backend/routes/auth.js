const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authCheck = require("../middleware/AuthMiddleware"); // ✅ Fixed import
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ✅ Signup Route
router.post("/signup", async (req, res) => {
  console.log("🔹 Received signup request:", req.body);

  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUserWithUsername = await User.findOne({ username });
    if (existingUserWithUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // ✅ Set first user as admin
    const isFirstUser = (await User.countDocuments()) === 0;
    const isAdmin = isFirstUser; 

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      isAdmin, // ✅ Now correctly defined
    });

    await newUser.save();
    console.log("✅ User registered:", newUser);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  console.log("🔹 Received login request:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Include isAdmin in JWT payload
    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin, 
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login successful:", { email, isAdmin: user.isAdmin });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin, 
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Verify Token Route
router.post("/verify-token", authCheck, async (req, res) => {
  res.status(200).json({ user: req.user, is_authenticated: req.is_authenticated });
});

module.exports = router;
