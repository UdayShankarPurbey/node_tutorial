const express = require('express');
const { registerUser, loginUser, changePassword } = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middlewares');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changePassword', authMiddleware, changePassword);

module.exports = router;
