const express = require('express');

const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const categoryController = require('../controllers/categoryController');

const categoriesRouter = express.Router();

categoriesRouter.get('/', validateTokenMiddleware, categoryController.getAllCategories);

categoriesRouter.post('/', validateTokenMiddleware, categoryController.createCategory);

module.exports = categoriesRouter;
