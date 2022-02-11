const { StatusCodes } = require('http-status-codes');

const { Categories } = require('../models');
const categorySchema = require('./schemas/categorySchema');

const errorHandling = require('../utils/errors/errorHandling');

const validateCategory = (name) => {
  const { error } = categorySchema.validate({ name });
  
  if (error) throw errorHandling(StatusCodes.BAD_REQUEST, error.message);
};

const createCategory = async (name) => {
  validateCategory(name);

  const category = Categories.create({ name });

  return category;
};

const getAllCategories = async () => {
  const categories = await Categories.findAll();

  return categories;
};

const getCategory = async (id) => {
  const category = await Categories.findAll({
    where: { id },
  });

  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
};
