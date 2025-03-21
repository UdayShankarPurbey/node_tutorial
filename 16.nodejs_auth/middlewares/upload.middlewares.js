const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const storedfileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, storedfileName);
  }
})

const checkFileFilter = (req , file , cb) => {
  if(file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'));
  }
}

module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  preservePath: true,
  dest: 'uploads/'
})