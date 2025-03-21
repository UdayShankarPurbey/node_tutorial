const Image = require('../models/image');
const uploadToCloudinary = require('../helpers/cloudinaryHelpers');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadImage = async (req , res) => {
  try {
    if(!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    const { url , public_id } = await uploadToCloudinary(req.file.path);
    const image = await Image.create({ url, publicId : public_id , uploadedBy : req.user.id});
    fs.unlinkSync(req.file.path);
    res.status(201).json({ success: true, message: "Image uploaded successfully", data: image });
    
  } catch (error) {
    console.log("Error uploading image" + error);
    res.status(500).json({ success : false , message: "Error uploading image" });
  }
}

const getAllImage = async (req , res) => {
  try {
    const images = await Image.find({ uploadedBy : req.user._id}).sort({ createdAt : -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.log("Error getting images" + error);
    res.status(500).json({ success : false , message: "Error getting images" });
  }
}

const deleteImage = async (req , res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const image = await Image.findById(id);

    if (!image)
      return res
       .status(404)
       .json({ success: false, message: "Image not found" });


    if(image.uploadedBy.toString() !== userId) {
      return res
       .status(403)
       .json({ success: false, message: "You are not authorized to delete this image" });
    }

    await cloudinary.uploader.destroy(image.publicId);
    await Image.findByIdAndDelete(id);

    res
     .status(200)
     .json({ success: true, message: "Image deleted successfully" });    
    
  } catch (error) {
    console.log("Error deleting image" + error);
    res.status(500).json({ success : false , message: "Error deleting image" });    
  }
};

module.exports = {
  uploadImage,
  getAllImage,
  deleteImage,
}