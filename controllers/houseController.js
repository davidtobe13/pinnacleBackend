const House = require('../models/houseModel');
const cloudinary = require('../config/cloudinary');

exports.uploadHouse = async (req, res) => {
  try {
    const {
      title,
      price,
      beds,
      baths,
      size,
      yearBuilt,
      address,
      features = [], // Default to empty array if undefined
      specs = {},    // Default to empty object if undefined
    } = req.body;

    // Validate req.files
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Get image URLs from uploaded files
    const imageUrls = req.files.map(file => file.path);

    // // Ensure features is an array
    // const parsedFeatures = Array.isArray(features) ? features : [];

    let parsedFeatures = [];
    if (typeof features === 'string') {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (jsonError) {
        console.error('Invalid JSON for features:', jsonError);
        return res.status(400).json({ message: 'Invalid JSON format for features' });
      }
    } else if (Array.isArray(features)) {
      parsedFeatures = features;
    }

    // Ensure specs is a Map
    let parsedSpecs = {};
    if (typeof specs === 'string') {
      try {
        parsedSpecs = JSON.parse(specs);
      } catch (jsonError) {
        console.error('Invalid JSON for specs:', jsonError);
        return res.status(400).json({ message: 'Invalid JSON format for specs' });
      }
    } else if (typeof specs === 'object' && specs !== null) {
      parsedSpecs = specs;
    }

    // Create a new house instance
    const newHouse = new House({
      title,
      price,
      beds,
      baths,
      size,
      yearBuilt,
      address,
      images: imageUrls,
      features: parsedFeatures,
      specs: parsedSpecs, // This will be saved as a Map
    });

    // Save the house to the database
    await newHouse.save();

    // Respond with success
    res.status(201).json({ message: 'House uploaded successfully', house: newHouse });
  } catch (error) {
    console.error('Error uploading house:', error);
    res.status(500).json({
      message: 'Error uploading house',
      error: error.message || 'An unknown error occurred'
    });
  }
};



exports.getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({
      message: 'Error fetching houses',
      error: error.message || 'An unknown error occurred'
    });
  }
};
