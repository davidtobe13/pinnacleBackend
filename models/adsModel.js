// models/Upload.js
const mongoose = require('mongoose');

const uploadAdSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('uploadAd', uploadAdSchema);


