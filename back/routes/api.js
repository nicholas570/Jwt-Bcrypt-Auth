const express = require('express');
const authRouter = require('./auth/auth');
const usersRouter = require('./users/users');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

module.exports = router;
