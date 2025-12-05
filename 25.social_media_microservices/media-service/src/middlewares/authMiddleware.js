const logger = require('../utils/logger');

const authenticateRequest = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    logger.warn('User ID not found in request headers');
    return res.status(401).json({
      success: false,
      message: 'User ID not found in request headers',
    });
  }
  req.user = { userId };
  next();
};

module.exports = { authenticateRequest };
