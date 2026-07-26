const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, uppercase: true },
  discountType: { type: String, enum: ["percent", "flat"], default: "percent" },
  discountValue: Number,
  minOrderAmount: { type: Number, default: 0 },
  maxDiscount: { type: Number, default: null },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Coupon", couponSchema);
