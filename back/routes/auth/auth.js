const express = require('express');
const AuthController = require('../../controllers/authController');
const validateRegistrationDatas = require('../../middlewares/auth/checkRegistration');

const router = express.Router();

router.post('/register', validateRegistrationDatas, AuthController.register);

module.exports = router;
