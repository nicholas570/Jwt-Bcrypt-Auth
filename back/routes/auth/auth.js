const express = require('express');
const AuthController = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [authMiddleware.validateRegistrationDatas],
  AuthController.register
);

module.exports = router;
