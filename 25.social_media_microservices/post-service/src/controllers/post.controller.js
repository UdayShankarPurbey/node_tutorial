const Post = require("../models/post");
const logger = require("../utils/logger");
const { validateCreatePost } = require("../utils/validation");

async function invalidatePostCache(req, input) {
  const keys = await req.redisClient.keys("posts:*");
  if (keys?.length > 0) {
    await req.redisClient.del(keys);
  }
}

const createPost = async (req, res) => {
  try {
    const { error } = validateCreatePost(req.body);

    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { content, mediaIds } = req.body;

    const newlyCreatedPost = await Post.create({
      user: req?.user?.userId,
      content,
      mediaIds: mediaIds || [],
    });
    await invalidatePostCache(req, newlyCreatedPost?._id?.toString());
    logger.info("Post created successfully", newlyCreatedPost);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newlyCreatedPost,
    });
  } catch (error) {
    logger.error("Error creating post", error);
    res.status(500).json({ success: false, message: "Error creating post" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `posts:${page}:${limit}`;
    const cachedPosts = await req.redisClient.get(cacheKey);
    if (cachedPosts) {
      logger.info("Fetched from cache", cacheKey);
      return res.json({
        success: true,
        data: JSON.parse(cachedPosts),
        message: "Posts fetched successfully",
      });
    }

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalPosts = await Post.countDocuments();

    const result = {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts: totalPosts,
    };

    await req.redisClient.setex(cacheKey, 3600, JSON.stringify(result));

    res.status(200).json({
      success: true,
      data: result,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    logger.error("Error getting all posts", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting all posts" });
  }
};

const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const cacheKey = `posts:${id}`;
    const cachedPost = await req.redisClient.get(cacheKey);
    if (cachedPost) {
      logger.info("Fetched from cache", cacheKey);
      return res.json({
        success: true,
        data: JSON.parse(cachedPost),
        message: "Post fetched successfully",
      });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    await req.redisClient.setex(cacheKey, 3600, JSON.stringify(post));
    res
      .status(200)
      .json({
        success: true,
        data: post,
        message: "Post fetched successfully",
      });
  } catch (error) {
    logger.error("Error getting post", error);
    res.status(500).json({ success: false, message: "Error getting post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    await invalidatePostCache(req, id);
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    logger.error("Error deleting post", error);
    res.status(500).json({ success: false, message: "Error deleting post" });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getPost,
  deletePost,
};
