const express = require("express");
const Coupon = require("../models/Coupon");
const router = express.Router();

// Create a coupon (for testing/admin use via Postman)
router.post("/", async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.json(coupon);
  } catch (error) {
    res.status(400).json({ message: "Failed to create coupon", error: error.message });
  }
});

// Validate a coupon code against an order amount
router.post("/validate", async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid or expired coupon code" });
    }

    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order of Rs. ${coupon.minOrderAmount} required for this coupon`
      });
    }

    let discount = 0;
    if (coupon.discountType === "percent") {
      discount = (orderAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    discount = Math.round(discount);

    res.json({
      code: coupon.code,
      discount,
      finalAmount: orderAmount - discount
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to validate coupon", error: error.message });
  }
});

module.exports = router;
