const express = require('express');
const AuthController = require('../../controllers/authController');
const {
  validateRegistrationDatas,
  hashPassword,
} = require('../../middlewares/auth/authMiddlewares');

const router = express.Router();

router.post(
  '/register',
  validateRegistrationDatas,
  hashPassword,
  AuthController.register
);

module.exports = router;
