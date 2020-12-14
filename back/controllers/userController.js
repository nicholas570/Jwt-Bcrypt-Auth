const UserModel = require('../models/user');

const UserController = {};

UserController.findAll = async (req, res) => {
  await UserModel.getAll((err, results) => {
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

UserController.findOne = async (req, res) => {
  const { id } = req.params;
  await UserModel.getOne(id, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err.sql,
        data: {},
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: '',
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: '',
      error: '',
      data: result,
    });
  });
};

module.exports = UserController;
