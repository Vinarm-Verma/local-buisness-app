const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// PLACE a new order
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Failed to place order', error: error.message });
  }
});

// GET all orders for a specific business (for owner dashboard)
router.get('/business/:businessId', async (req, res) => {
  try {
    const orders = await Order.find({ businessId: req.params.businessId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// GET all orders placed by a specific user (order history)
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// UPDATE order status (owner confirms/delivers)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update order', error: error.message });
  }
});

module.exports = router;