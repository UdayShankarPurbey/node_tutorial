const express = require('express');
const authMiddleware = require('../middlewares/auth.middlewares');
const router = express.Router();

router.get('/welcome', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the API',
    user: req.user,
  });
});

module.exports = router;
