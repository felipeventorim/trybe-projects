const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const recipeSchema = require('./recipeSchema');
const idSchema = require('./idSchema');

const errorHandling = require('../utils/functions/errorHandling');
const { badRequest, notFound, unauthorized } = require('../utils/dictionary/statusCode');
const {
  invalidEntries,
  recipeNotFound,
  missingAuthToken,
} = require('../utils/dictionary/ErrorMessages');

const addRecipe = async (newRecipe, email) => {
  const { error } = recipeSchema.validate(newRecipe);

  if (error) throw errorHandling(badRequest, invalidEntries);

  const { _id: userId } = await usersModel.findUserByEmail(email);

  const id = await recipesModel.addRecipe({ userId, ...newRecipe });

  return { id, userId };
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();

  return recipes;
};

const getRecipe = async (id) => {
  const { error } = idSchema.validate(id);

  if (error) throw errorHandling(notFound, recipeNotFound);

  const recipe = await recipesModel.getRecipe(id);

  if (!recipe) throw errorHandling(notFound, recipeNotFound);

  return recipe;
};

const validateUser = async (id, email, role) => {
  const { userId } = await getRecipe(id);

  const user = await usersModel.findUserById(userId);

  if (email !== user.email && role !== 'admin') throw errorHandling(unauthorized, missingAuthToken);

  return userId;
};

const updateRecipe = async (recipeToUpdate, id, email, role) => {
  const userId = await validateUser(id, email, role);

  await recipesModel.updateRecipe(recipeToUpdate, id);

  return { _id: id, userId, ...recipeToUpdate };
};

const deleteRecipe = async (id, email, role) => {
  await validateUser(id, email, role);

  await recipesModel.deleteRecipe(id);
};

const addImage = async (id, email, role) => {
  await validateUser(id, email, role);

  await recipesModel.addImage(id);

  return getRecipe(id);
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImage,
};
