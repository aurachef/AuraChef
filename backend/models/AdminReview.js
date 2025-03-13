const mongoose = require("mongoose");

const adminReviewSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["approved", "rejected"], required: true },
  reviewDate: { type: Date, default: Date.now },
  reason: { type: String, default: "" }
});

module.exports = mongoose.model("AdminReview", adminReviewSchema);