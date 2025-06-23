const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

const ValidateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    logger.warn("Access token not found");
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn("Invalid access token");
      return res.status(429).json({
        success: false,
        message: "Invalid access token",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = ValidateToken;
