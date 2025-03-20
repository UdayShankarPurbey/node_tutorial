const express = require('express');
const authMiddleware = require('../middlewares/auth.middlewares');
const adminMiddleware = require('../middlewares/admin.middlewares');


const router = express.Router();

router.post('/upload' , authMiddleware , adminMiddleware , );


module.exports = router;