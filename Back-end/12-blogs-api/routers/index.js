const express = require('express');

const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const categoryRouter = require('./categoryRouter');
const postRouter = require('./postRouter');

const router = express.Router();

router.use('/user', userRouter);

router.use('/login', loginRouter);

router.use('/categories', categoryRouter);

router.use('/post', postRouter);

module.exports = router;
