const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  name: String,
  description: String,
  price: Number,
  unit: { type: String, default: "item" },
  photo: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Item", itemSchema);
