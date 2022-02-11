const express = require('express');
const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const recipesRouter = require('./recipesRouter');
const imagesRouter = require('./imagesRouter');

const Router = express.Router();

Router.use('/users', usersRouter);
Router.use('/login', loginRouter);
Router.use('/recipes', recipesRouter);
Router.use('/images', imagesRouter);

module.exports = Router;
