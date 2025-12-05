const cloudinary = require('../config/cloudinary.js');

const uploadToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    // console.log(result);
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading file to cloudinary : ' + error);
    throw new Error(`Error uploading file to cloudinary: ${error.message}`);
  }
};

module.exports = uploadToCloudinary;
