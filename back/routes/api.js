const express = require('express');
const authRouter = require('./auth/auth');
const userRouter = require('./user/user');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
