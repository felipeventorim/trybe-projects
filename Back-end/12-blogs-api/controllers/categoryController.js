const { StatusCodes } = require('http-status-codes');

const categoryService = require('../services/categoryService');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await categoryService.createCategory(name);

    res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
