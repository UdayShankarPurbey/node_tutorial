const uploadMediaTocloudinary = require("../utils/cloudinary");
const logger = require("../utils/logger");


const uploadMedia = async (req, res) => {
  logger.info('Upload media...');
  try {
    if(!req.file) {
      logger.warn('No file uploaded');
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const {originalName , mimeType , buffer} = req.file;
    const userId = req.user.userId;
    logger.info(`File Details : name = ${originalName} , mimeType = ${mimeType} `);
    logger.info('Uploading To Cloudinary Started...');

    const cloudinaryUploadResult = await uploadMediaTocloudinary(req.file);

    logger.info(`Cloudinary Upload successfully. Public Id : ${cloudinaryUploadResult.public_id}`);

    // const newlyCreatedMedia = await 
  } catch (error) {
    
  }
}