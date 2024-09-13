// controllers/uploadController.js
const cloudinary = require('../config/cloudinary');
const Upload = require('../models/adsModel');

exports.uploadAds = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageFile = req.file;

    if (!imageFile || !title || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const imageUrl = imageFile.path; // This will be the URL provided by Cloudinary
    
    // Create a new upload record
    const newUpload = new Upload({
      imageUrl,
      title,
      description,
    });

    // Save the upload record to the database
    await newUpload.save();

    res.status(201).json({ message: 'Upload successful!', data: newUpload });
  } catch (error) {
    console.error(error+ " neww");
    res.status(500).json({ message: 'An error occurred during upload.' });
  }
};




exports.getAllAds = async (req, res) =>{
    try{
        const Ads = await Upload.find();
        res.status(200).json(Ads);
      } catch (error) {
        console.error('Error fetching Ads:', error);
        res.status(500).json({ message: 'Error fetching Ads', error: error.message });
      }
}