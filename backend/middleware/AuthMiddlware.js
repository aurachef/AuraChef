const jwt = require("jsonwebtoken");
const  JWT_SECRET  = process.env.JWT_SECRET;
const User = require("../models/User"); // Assuming User model is here

const authCheck = async (req, res, next) => {
  console.log("cheking AUTH  ✅ ")
  const token = req.header("Authorization");
  console.log(token)
  if (!token) {
    req.user = null;
    req.is_authenticated = false;
    next();
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    const user = await User.findOne({ email: decoded.email }).select('-password');
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.is_authenticated = true;
    console.log("✅ Token verified, user authorized:", user.email);
    next();
  } catch (error) {
    console.log("❌ Invalid token");
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authCheck;
