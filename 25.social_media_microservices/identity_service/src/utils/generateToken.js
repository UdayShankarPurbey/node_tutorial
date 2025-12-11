const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/refreshToken');

const generateToken = async (user) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '60m' });
  const refreshToken = crypto.randomBytes(40).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // expires in 24 hours

  await RefreshToken.deleteOne({ user: user._id });

  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expiresAt,
  });
  return {
    accessToken,
    refreshToken,
  };
};

module.exports = generateToken;
