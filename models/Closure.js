const mongoose = require('mongoose');
const Language = require('./Language').schema;
const Color = require('./Color').schema;

const closureSchema = new mongoose.Schema({
  name: [Language],
  colors: [Color],
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

module.exports = mongoose.model('Closure', closureSchema);
