const express = require('express');
const Business = require('../models/Business');
const router = express.Router();

// ADD a new business
router.post('/', async (req, res) => {
  try {
    const { name, category, description, address, lat, lng, contact, ownerId } = req.body;
    const business = await Business.create({
      name,
      category,
      description,
      address,
      contact,
      ownerId,
      location: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    });
    res.json(business);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add business', error: error.message });
  }
});

// FIND nearby businesses
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, distance = 5000, category } = req.query;
    const query = {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(distance)
        }
      }
    };
    if (category) {
      query.category = category;
    }
    const businesses = await Business.find(query);
    res.json(businesses);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch businesses', error: error.message });
  }
});

// GET all businesses owned by a specific user
// IMPORTANT: this route must stay ABOVE the "/:id" route below,
// otherwise Express will treat "owner" as if it were an :id value
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const businesses = await Business.find({ ownerId: req.params.ownerId });
    res.json(businesses);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch owner businesses', error: error.message });
  }
});

// GET one business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    res.json(business);
  } catch (error) {
    res.status(400).json({ message: 'Business not found', error: error.message });
  }
});

module.exports = router;