const express = require('express');
const authMiddleware = require('../middlewares/auth.middlewares');
const adminMiddleware = require('../middlewares/admin.middlewares');
const multerMiddleware = require('../middlewares/upload.middlewares');
const { uploadImage, getAllImage, deleteImage } = require('../controllers/image.controllers');

const router = express.Router();

router.post('/image' , authMiddleware , adminMiddleware  ,multerMiddleware.single('image'), uploadImage  );
router.get('/getAllImages' , authMiddleware , adminMiddleware , getAllImage );
router.delete('/delete/:id' , authMiddleware , adminMiddleware , deleteImage  );



module.exports = router;