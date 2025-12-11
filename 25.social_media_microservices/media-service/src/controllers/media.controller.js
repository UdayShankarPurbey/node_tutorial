const uploadMediaTocloudinary = require('../utils/cloudinary');
const logger = require('../utils/logger');
const Media = require('../models/media');

const uploadMedia = async (req, res) => {
  logger.info('Upload media...');
  try {
    if (!req.file) {
      logger.warn('No file uploaded');
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { originalName, mimeType, buffer } = req.file;
    const userId = req.user.userId;
    logger.info(`File Details : name = ${originalName} , mimeType = ${mimeType} `);
    logger.info('Uploading To Cloudinary Started...');

    const cloudinaryUploadResult = await uploadMediaTocloudinary(req.file);

    logger.info(`Cloudinary Upload successfully. Public Id : ${cloudinaryUploadResult.public_id}`);

    const newlyCreatedMedia = await Media.create({
      publicId: cloudinaryUploadResult.public_id,
      originalName,
      mimeType,
      url: cloudinaryUploadResult.secure_url,
      userId,
    });

    res.status(200).json({
      success: true,
      message: 'Media uploaded successfully',
      data: newlyCreatedMedia,
    });
  } catch (error) {
    logger.error('Error While Uploading Media', error);
    res.status(500).json({
      success: false,
      message: 'Error While Uploading Media',
      error: error.message,
    });
  }
};

module.exports = { uploadMedia };
