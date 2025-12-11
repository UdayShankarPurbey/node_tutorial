const RefreshToken = require('../models/refreshToken');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const logger = require('../utils/logger');
const { validateRegister, validateLogin } = require('../utils/validation');

// register
const registerUser = async (req, res) => {
  logger.info('Register user');
  try {
    const { error } = validateRegister(req.body);

    if (error) {
      logger.warn('Validation error', error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { username, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      logger.warn('User already exists');
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });
    logger.info('User created', newUser?._id);

    const { accessToken, refreshToken } = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        newUser,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error('Error creating user', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// login
const loginUser = async (req, res) => {
  logger.info('Login User...');
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      logger.warn(`Validation error: ${error.details[0].message}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      logger.warn('User not found');
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      logger.warn('Invalid password');
      return res.status(400).json({
        success: false,
        message: 'Invalid password',
      });
    }

    const { accessToken, refreshToken } = await generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: user._id,
      },
    });
  } catch (error) {
    logger.error(`Error Login user: ${error.message}`, error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// refresh token
const refreshTokenController = async (req, res) => {
  logger.info('Refresh token');
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn('Refresh token not found');
      return res.status(400).json({
        success: false,
        message: 'Refresh token not found',
      });
    }

    const sotredToken = await RefreshToken.findOne({ token: refreshToken });
    if (!sotredToken || sotredToken?.expiresAt < new Date()) {
      logger.warn('Refresh token not found or expired');
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found or expired',
      });
    }

    const user = await User.findById(sotredToken.user);

    if (!user) {
      logger.warn('User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await generateToken(user);

    await RefreshToken.deleteOne({ _id: sotredToken._id });

    return res.status(200).json({
      success: true,
      message: 'Refresh token successful',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        userId: user._id,
      },
    });
  } catch (error) {
    logger.error(`Error Refresh  user: ${error.message}`, error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// logout
const logoutUser = async (req, res) => {
  logger.info('Logout User...');
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn('Refresh token not provided');
      return res.status(400).json({
        success: false,
        message: 'Refresh token not provided',
      });
    }

    const isValidRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!isValidRefreshToken) {
      logger.warn('Refresh token not found');
      return res.status(400).json({
        success: false,
        message: 'Refresh token not found',
      });
    }

    await RefreshToken.deleteOne({ token: refreshToken });
    logger.info('Logout successful');
    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    logger.error('Error logout user', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshTokenController,
  logoutUser,
};
