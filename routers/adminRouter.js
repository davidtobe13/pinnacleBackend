const express = require('express');
const { registerAdmin, universalLogin, getAllUsers, deleteUser } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authorization');
const { verifyUser } = require('../controllers/userController');

const router = express.Router();

router.post('/admin-signup', registerAdmin);
router.post('/login', universalLogin);
router.put('/verify-user/:id', authenticateAdmin, verifyUser);
router.get('/all-users', authenticateAdmin, getAllUsers);
router.delete('/delete-user/:id', authenticateAdmin, deleteUser )



module.exports = router;   
