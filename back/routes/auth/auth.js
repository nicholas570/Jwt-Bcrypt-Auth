const express = require('express');
const AuthController = require('../../controllers/authController');
const {
  validateRegistrationDatas,
  hashPassword,
  authenticateToken,
} = require('../../middlewares/auth/authMiddlewares');

const router = express.Router();

router.post(
  '/register',
  validateRegistrationDatas,
  hashPassword,
  AuthController.register
);

router.post('/login', AuthController.login);

router.post('/authenticateToken', AuthController.authenticateToken);

module.exports = router;
