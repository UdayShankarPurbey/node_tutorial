const Image = require('../models/image');
const uploadToCloudinary = require('../helpers/cloudinaryHelpers');

const uploadImage = async (req , res) => {
  try {
    if(!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    const { url , public_id } = await uploadToCloudinary(req.file.path);
    const image = await Image.create({ url, public_id , uploadedBy : req.user._id});
    res.status(201).json({ success: true, message: "Image uploaded successfully", data: image });
    
  } catch (error) {
    console.log("Error uploading image" + error);
    res.status(500).json({ success : false , message: "Error uploading image" });
  }
}

module.exports = {
  uploadImage,
}