// Assuming you have a `createdAt` field in both `House` and `Vehicle` schemas
const Vehicle = require('../models/vehicleModel');
const House = require('../models/houseModel');

exports.getAllHousesAndVehicles = async (req, res) => {
    try {
      // Fetch houses and vehicles
      const houses = await House.find();
      const vehicles = await Vehicle.find();
  
      // Combine both arrays
      const combined = [...houses, ...vehicles];
  
      // Sort combined array by creation date (assuming `createdAt` field exists in both models)
      combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      // Respond with the sorted combined array
      res.status(200).json({"message": `Fetched ${combined.length} data`, "data":combined});
    } catch (error) {
      console.error('Error fetching houses and vehicles:', error);
      res.status(500).json({ message: 'Error fetching houses and vehicles', error: error.message });
    }
  };
  


exports.getEntityById = async (req, res) => {
  const { id, type } = req.params; // 'type' should be 'house' or 'vehicle'

  try {
    let entity;

    // Fetch the entity based on its type
    if (type === 'house') {
      entity = await House.findById(id);
    } else if (type === 'vehicle') {
      entity = await Vehicle.findById(id);
    } else {
      return res.status(400).json({ message: 'Invalid entity type' });
    }

    // Check if the entity was found
    if (!entity) {
      return res.status(404).json({ message: 'Entity not found' });
    }

    // Respond with the entity details
    res.status(200).json(entity);
  } catch (error) {
    console.error('Error fetching entity by ID:', error);
    res.status(500).json({ message: 'Error fetching entity by ID', error: error.message });
  }
};
