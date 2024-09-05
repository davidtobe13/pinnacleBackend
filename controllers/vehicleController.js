// const Vehicle = require('../models/vehicleModel');
// const cloudinary = require('../config/cloudinary');

// exports.uploadVehicle = async (req, res) => {
//   try {
//     const {
//       title,
//       price,
//       mileage,
//       stock,
//       vin,
//       features,
//       specs,
//       additionalSpecs,
//     } = req.body;

//     const imageUrls = req.files.map(file => file.path);

//     const newVehicle = new Vehicle({
//       title,
//       price,
//       mileage,
//       stock,
//       vin,
//       images: imageUrls,
//       features: JSON.parse(features),
//       specs: JSON.parse(specs),
//       additionalSpecs: JSON.parse(additionalSpecs),
//     });

//     await newVehicle.save();

//     res.status(201).json({ message: 'Vehicle uploaded successfully', vehicle: newVehicle });
//   } catch (error) {
//     console.error('Error uploading vehicle:', error);
//     res.status(500).json({ message: 'Error uploading vehicle', error: error.message });
//   }
// };

// exports.getAllVehicles = async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find();
//     res.status(200).json(vehicles);
//   } catch (error) {
//     console.error('Error fetching vehicles:', error);
//     res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
//   }
// };


const Vehicle = require('../models/vehicleModel');
const cloudinary = require('../config/cloudinary');

exports.uploadVehicle = async (req, res) => {
  try {
    const {
      title,
      price,
      mileage,
      stock,
      vin,
      features = [], // Default to empty array if undefined
      specs = {},    // Default to empty object if undefined
      additionalSpecs = [] // Default to empty array if undefined
    } = req.body;

    // Validate req.files
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Get image URLs from uploaded files
    const imageUrls = req.files.map(file => file.path);

    // Ensure features is an array
    let parsedFeatures = [];
    if (typeof features === 'string') {
      try {
        parsedFeatures = JSON.parse(features);
        if (!Array.isArray(parsedFeatures)) {
          return res.status(400).json({ message: 'Features must be an array' });
        }
      } catch (jsonError) {
        console.error('Invalid JSON for features:', jsonError);
        return res.status(400).json({ message: 'Invalid JSON format for features' });
      }
    } else if (Array.isArray(features)) {
      parsedFeatures = features;
    }

    // Ensure specs is an object
    let parsedSpecs = {};
    if (typeof specs === 'string') {
      try {
        parsedSpecs = JSON.parse(specs);
        if (typeof parsedSpecs !== 'object' || parsedSpecs === null) {
          return res.status(400).json({ message: 'Specs must be an object' });
        }
      } catch (jsonError) {
        console.error('Invalid JSON for specs:', jsonError);
        return res.status(400).json({ message: 'Invalid JSON format for specs' });
      }
    } else if (typeof specs === 'object' && specs !== null) {
      parsedSpecs = specs;
    }

    // Ensure additionalSpecs is an array of objects
    let parsedAdditionalSpecs = [];
    if (typeof additionalSpecs === 'string') {
      try {
        parsedAdditionalSpecs = JSON.parse(additionalSpecs);
        if (!Array.isArray(parsedAdditionalSpecs)) {
          return res.status(400).json({ message: 'Additional specs must be an array' });
        }
        parsedAdditionalSpecs.forEach(spec => {
          if (typeof spec !== 'object' || spec === null || !spec.category || !spec.item || !spec.value) {
            throw new Error('Each additional spec must be an object with category, item, and value');
          }
        });
      } catch (jsonError) {
        console.error('Invalid JSON for additionalSpecs:', jsonError);
        return res.status(400).json({ message: 'Invalid JSON format for additionalSpecs' });
      }
    } else if (Array.isArray(additionalSpecs)) {
      parsedAdditionalSpecs = additionalSpecs;
      parsedAdditionalSpecs.forEach(spec => {
        if (typeof spec !== 'object' || spec === null || !spec.category || !spec.item || !spec.value) {
          return res.status(400).json({ message: 'Each additional spec must be an object with category, item, and value' });
        }
      });
    }

    // Create a new vehicle instance
    const newVehicle = new Vehicle({
      title,
      price,
      mileage,
      stock,
      vin,
      images: imageUrls,
      features: parsedFeatures,
      specs: parsedSpecs,
      additionalSpecs: parsedAdditionalSpecs
    });

    // Save the vehicle to the database
    await newVehicle.save();

    // Respond with success
    res.status(201).json({ message: 'Vehicle uploaded successfully', vehicle: newVehicle });
  } catch (error) {
    console.error('Error uploading vehicle:', error);
    res.status(500).json({
      message: 'Error uploading vehicle',
      error: error.message || 'An unknown error occurred'
    });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};
