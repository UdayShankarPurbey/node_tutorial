const cloudinary = require('../config/cloudinary');

const uploadToCloudinary =  async (filepath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filepath, {
      public_id: `my-app/images/${Date.now()}`,
      folder: 'my-app-images',
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file to cloudinary : " + error);
    throw new Error(`Error uploading file to cloudinary: ${error.message}`);
  }
}

module.exports = uploadToCloudinary;