const express = require('express');
const authUserMiddleware = require('../middlewares/authUserMiddleware');
const recipesController = require('../controllers/recipesController');
const upload = require('../multer');

const recipesRouter = express.Router();

recipesRouter.put(
  '/:id/image',
  authUserMiddleware,
  upload.single('image'),
  recipesController.addImage,
);

recipesRouter.get('/:id', recipesController.getRecipe);

recipesRouter.put('/:id', authUserMiddleware, recipesController.updateRecipe);

recipesRouter.delete('/:id', authUserMiddleware, recipesController.deleteRecipe);

recipesRouter.get('/', recipesController.getAllRecipes);

recipesRouter.post('/', authUserMiddleware, recipesController.addRecipe);

module.exports = recipesRouter;
