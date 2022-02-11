const express = require('express');
const userController = require('../controllers/userController');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const userRouter = express.Router();

userRouter.get('/:id', validateTokenMiddleware, userController.getUser);

userRouter.get('/', validateTokenMiddleware, userController.getAllUsers);

userRouter.post('/', userController.createUser);

userRouter.delete('/me', validateTokenMiddleware, userController.deleteUser);

module.exports = userRouter;
