require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());

// Routes (Temporary Test Route)
app.get("/", (req, res) => {
    res.send("AuraChef API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
