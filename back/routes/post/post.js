const express = require('express');
const PostController = require('../../controllers/postController');
const { authenticateToken } = require('../../middlewares/auth/authMiddlewares');

const router = express.Router();

router.get('/', authenticateToken, PostController.findAllPosts);

module.exports = router;
