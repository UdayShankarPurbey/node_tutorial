const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  refreshTokenController,
  logoutUser
} = require('../controllers/identity.controller');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refreshToken', refreshTokenController);
router.post('/logout', logoutUser);


module.exports = router;