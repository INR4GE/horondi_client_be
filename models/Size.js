const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
  name: String,
  heightInCm: Number,
  widthInCm: Number,
  depthInCm: Number,
  volumeInLiters: Number,
  weightInKg: Number,
  available: Boolean,
  additionalPrice: {
    type: [
      {
        currency: String,
        value: Number,
      },
    ],
    default: [
      {
        currency: String,
        value: 0,
      },
    ],
  },
});

module.exports = mongoose.model('Size', SizeSchema);
