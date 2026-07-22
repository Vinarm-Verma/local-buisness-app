const express = require('express');
const Review = require('../models/Review');
const Business = require('../models/Business');
const router = express.Router();

// ADD a review
router.post('/', async (req, res) => {
  try {
    const { businessId, userId, userName, rating, text } = req.body;

    const review = await Review.create({
      businessId: businessId,
      userId: userId,
      userName: userName,
      rating: rating,
      text: text
    });

    // Recalculate the business's average rating
    const allReviews = await Review.find({ businessId: businessId });
    const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const average = total / allReviews.length;

    await Business.findByIdAndUpdate(businessId, { avgRating: average.toFixed(1) });

    res.json(review);

  } catch (error) {
    res.status(400).json({ message: 'Failed to add review', error: error.message });
  }
});

// GET all reviews for a business
router.get('/:businessId', async (req, res) => {
  try {
    const reviews = await Review.find({ businessId: req.params.businessId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch reviews', error: error.message });
  }
});

module.exports = router;