const express = require('express');
const router = express.Router();
const { authenticateRequest } = require('../middlewares/authMiddleware');
const { createPost, getAllPost, getPost, deletePost } = require('../controllers/post.controller');


router.use(authenticateRequest);

router.post('/create-post', createPost);
router.get('/all-posts', getAllPost);
router.get('/post/:id', getPost);
router.delete('/post/:id', deletePost);


module.exports = router;