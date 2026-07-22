const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  name: String,
  description: String,
  price: Number,
  photo: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Item', itemSchema);