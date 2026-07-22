const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// ADD a new item to a business
router.post('/', async (req, res) => {
  try {
    const { businessId, name, description, price, photo } = req.body;
    const item = await Item.create({ businessId, name, description, price, photo });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add item', error: error.message });
  }
});

// GET all items for a specific business
router.get('/:businessId', async (req, res) => {
  try {
    const items = await Item.find({ businessId: req.params.businessId });
    res.json(items);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch items', error: error.message });
  }
});

// UPDATE an item (e.g., mark unavailable, change price)
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update item', error: error.message });
  }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete item', error: error.message });
  }
});

module.exports = router;