const PostModel = require('../models/post');

const PostController = {};

PostController.findAllPosts = async (req, res) => {
  await PostModel.getAll(req.user.email, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    }
    res.status(200).json({
      success: true,
      message: '',
      error: '',
      data: results,
    });
  });
};

module.exports = PostController;
