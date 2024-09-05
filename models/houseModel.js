const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures price is not negative
  },
  beds: {
    type: Number,
    required: true,
    min: 0, // Ensures beds is not negative
  },
  baths: {
    type: Number,
    required: true,
    min: 0, // Ensures baths is not negative
  },
  size: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing spaces
  },
  yearBuilt: {
    type: Number,
    required: true,
    min: 1800, // Assumes houses are not older than 1800
    max: new Date().getFullYear(), // Ensures the year is not in the future
  },
  address: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing spaces
  },
  images: {
    type: [String],
    default: [], // Default to an empty array
  },
  features: {
    type: [String],
    default: [], // Default to an empty array
  },
  specs: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // Use a Map for flexible key-value pairs
    default: {}, // Default to an empty object
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('House', houseSchema);
