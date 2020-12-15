const UserModel = require('../models/user');

const AuthController = {};

AuthController.register = async (req, res) => {
  const user = req.body;

  await UserModel.create(user, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        data: {},
        error: err.message,
      });
    }

    return UserModel.getOne(result.insertId, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          success: false,
          message: 'Something went wrong',
          data: {},
          error: err2.message,
        });
      }
      const newUser = records[0];
      return res.status(201).json({
        success: true,
        message: 'Succesfully registered',
        data: newUser,
        error: '',
      });
    });
  });
};

module.exports = AuthController;
