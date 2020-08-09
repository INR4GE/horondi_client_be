const mongoose = require('mongoose');
const Language = require('../../models/Language').schema;
const PrimaryImage = require('../../models/PrimaryImage').schema;
const ImageSet = require('../common/ImageSet').schema;

const NewsSchema = new mongoose.Schema({
  title: String,
  text: String,
  lang: String,
  images: PrimaryImage,
  author: {
    name: String,
    image: ImageSet,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  show: Boolean,
});

module.exports = mongoose.model('News', NewsSchema);
