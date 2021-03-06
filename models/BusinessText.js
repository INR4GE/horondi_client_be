const mongoose = require('mongoose');
const Language = require('./Language').schema;

const businessTextSchema = new mongoose.Schema({
  code: String,
  title: [Language],
  text: [Language],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BusinessText', businessTextSchema);
