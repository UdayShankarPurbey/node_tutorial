const rateLimit = require('express-rate-limit');

const createBasicRateLimiter = (maxRequests, time) => {
  return rateLimit({
    max: maxRequests,
    windowMs: time,
    message: 'Too Many requests ! Please Try again Later',
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = createBasicRateLimiter;
