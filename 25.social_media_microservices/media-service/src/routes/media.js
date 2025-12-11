const express = require('express');
const multer = require('multer');

const { authenticateRequest } = require('../middlewares/authMiddleware');
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single('file');

router.post('/upload');
