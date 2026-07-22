const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  contact: String,
  avgRating: { type: Number, default: 0 },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

businessSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Business', businessSchema);