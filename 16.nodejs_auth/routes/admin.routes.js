const express = require('express');
const authMiddleware = require('../middlewares/auth.middlewares');
const adminMiddleware = require('../middlewares/admin.middlewares');

const router = express.Router();

router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Admin Page',
    data: req.user,
  });
});

module.exports = router;
