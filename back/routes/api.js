const express = require('express');
const authRouter = require('./auth/auth');
const postRouter = require('./post/post');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/posts', postRouter);

module.exports = router;
