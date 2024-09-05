const express = require('express');
const router = express.Router();
const { getEntityById, getAllHousesAndVehicles } = require('../controllers/allProduct');


router.get('/oneproduct/:type/:id', getEntityById);

router.get('/all-product', getAllHousesAndVehicles);

module.exports = router;
