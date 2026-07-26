const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  addresses: [
    {
      label: String,
      fullAddress: String,
      phone: String
    }
  ],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Business" }]
});

module.exports = mongoose.model("User", userSchema);
