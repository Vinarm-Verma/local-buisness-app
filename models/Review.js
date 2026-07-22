const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  rating: Number,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);