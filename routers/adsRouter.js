const express = require('express');
const router = express.Router();
const { uploadAds, getAllAds } = require('../controllers/adsController');
const upload = require('../middleware/upload');

router.post('/upload-ad', upload.single('imageUrl'), uploadAds);
router.get('/get-all-ads', getAllAds)

module.exports = router;
