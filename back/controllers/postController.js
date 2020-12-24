const PostModel = require('../models/post');

const PostController = {};

PostController.findAllPosts = async (req, res) => {
  if (req.user.email) {
    await PostModel.getAll(req.user.email, (err, results) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Something went wrong',
          error: err.message,
          data: {},
        });
      }
      return res.status(200).json({
        success: true,
        message: '',
        error: '',
        data: results,
      });
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: 'No email provided',
      data: {},
    });
  }
};

module.exports = PostController;
