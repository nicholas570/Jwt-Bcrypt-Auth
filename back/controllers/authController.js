require('dotenv').config();
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const { generateToken, generateRefreshToken } = require('../utils/signToken');

const AuthController = {};

AuthController.register = async (req, res) => {
  const user = req.body;
  const token = generateToken(user, process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = generateRefreshToken(
    user,
    process.env.REFRESH_TOKEN_SECRET
  );

  await UserModel.create(user, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        data: {},
        error: err.message,
      });
    }

    return UserModel.getOneWithId(result.insertId, (err2, records) => {
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
        token,
        refreshToken,
      });
    });
  });
};

AuthController.login = async (req, res) => {
  const { email } = req.body;
  const token = generateToken(req.body, process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = generateRefreshToken(
    req.body,
    process.env.REFRESH_TOKEN_SECRET
  );

  await UserModel.getOneWithHash(email, async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        data: {},
        error: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: {},
        error: '',
      });
    }
    if (await bcrypt.compare(req.body.password, result[0].password)) {
      return res.status(200).json({
        success: true,
        message: 'Succesfully authenticated',
        data: result[0],
        error: '',
        token,
        refreshToken,
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Wrong password',
      data: {},
      error: err,
    });
  });
};

module.exports = AuthController;
