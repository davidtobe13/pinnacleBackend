const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const upload = require('../middleware/upload');

router.post('/upload-truck', upload.array('images', 10), vehicleController.uploadVehicle);
router.get('/get-all-truck', vehicleController.getAllVehicles);

module.exports = router;