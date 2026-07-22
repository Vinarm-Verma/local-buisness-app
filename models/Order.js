const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: String,
  customerPhone: String,
  customerAddress: String,
  items: [
    {
      itemId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, Delivered, Cancelled
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);