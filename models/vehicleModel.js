// const mongoose = require('mongoose');

// const vehicleSchema = new mongoose.Schema({
//   title: String,
//   price: Number,
//   mileage: String,
//   stock: String,
//   vin: String,
//   images: [String],
//   features: [String],
//   specs: {
//     engine: String,
//     driveType: String,
//     transmission: String,
//     color: String,
//     priorUse: String,
//   },
//   additionalSpecs: [{
//     category: String,
//     item: String,
//     value: String,
//   }],
// });

// module.exports = mongoose.model('Vehicle', vehicleSchema);

const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
    trim: true, // Removes leading and trailing spaces
  },
  price: {
    type: Number,
    required: true, // Price is required
    min: 0, // Price should be a non-negative number
  },
  mileage: {
    type: String,
    required: true, // Mileage is required
    trim: true, // Removes leading and trailing spaces
  },
  stock: {
    type: String,
    required: true, // Stock is required
    trim: true, // Removes leading and trailing spaces
  },
  vin: {
    type: String,
    required: true, // VIN is required
    trim: true, // Removes leading and trailing spaces
    match: /^[A-HJ-NPR-Z0-9]{17}$/, // Validate VIN (common format)
  },
  images: {
    type: [String],
    default: [], // Default to an empty array if no images provided
  },
  features: {
    type: [String],
    default: [], // Default to an empty array if no features provided
  },
  specs: {
    engine: {
      type: String,
      required: true, // Engine specification is required
      trim: true, // Removes leading and trailing spaces
    },
    driveType: {
      type: String,
      required: true, // Drive type is required
      trim: true, // Removes leading and trailing spaces
    },
    transmission: {
      type: String,
      trim: true, // Removes leading and trailing spaces
    },
    color: {
      type: String,
      required: true, // Color is required
      trim: true, // Removes leading and trailing spaces
    },
    priorUse: {
      type: String,
      trim: true, // Removes leading and trailing spaces
    },
    horsepower: {
      type: String,
      trim: true, // Removes leading and trailing spaces
    },
    fuelCap: {
      type: String,
      trim: true, // Removes leading and trailing spaces
    },
  },
  additionalSpecs: [{
    category: {
      type: String,
      trim: true, // Removes leading and trailing spaces
    },
    item: {
      type: String,
      trim: true, // Removes leading and trailing spaces
    },
    value: {
      type: String,
      trim: true, // Removes leading and trailing spaces
    },
  }],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
