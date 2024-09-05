const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const upload = require('../middleware/upload');

router.post('/upload-house', upload.array('images', 10), houseController.uploadHouse);
router.get('/get-all-house', houseController.getAllHouses);

module.exports = router;