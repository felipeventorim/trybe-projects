const recipesService = require('../services/recipesService');
const { created, success, noContent } = require('../utils/dictionary/statusCode');

const addRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { email } = req.headers;

    const newRecipe = { name, ingredients, preparation };
    const { id, userId } = await recipesService.addRecipe(newRecipe, email);

    const recipe = { _id: id, userId, ...newRecipe };
    res.status(created).json({ recipe });
  } catch (error) {
    console.log(`POST ADDRECIPE => ${error.message}`);
    next(error);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const recipes = await recipesService.getAllRecipes();

    res.status(success).json(recipes);
  } catch (error) {
    console.log(`GET GETALLRECIPES => ${error.message}`);
    next(error);
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipesService.getRecipe(id);

    res.status(success).json(recipe);
  } catch (error) {
    console.log(`GET GETRECIPE => ${error.message}`);
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { email, role } = req.headers;
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const recipeToUpdate = { name, ingredients, preparation };

    const updatedRecipe = await recipesService.updateRecipe(recipeToUpdate, id, email, role);

    res.status(success).json(updatedRecipe);
  } catch (error) {
    console.log(`PUT UPDATERECIPE => ${error.message}`);
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { email, role } = req.headers;
    const { id } = req.params;

    await recipesService.deleteRecipe(id, email, role);
    
    res.status(noContent).send();
  } catch (error) {
    console.log(`DELETE DELETERECIPE => ${error.message}`);
    next(error);
  }
};

const addImage = async (req, res, next) => {
  try {
    const { email, role } = req.headers;
    const { id } = req.params;

    const recipe = await recipesService.addImage(id, email, role);
    
    res.status(success).json(recipe);
  } catch (error) {
    console.log(`PUT ADDIMAGE => ${error.message}`);
    next(error);
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImage,
};
