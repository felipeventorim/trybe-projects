const express = require('express');
const imagesControllers = require('../controllers/imagesControllers');

const imagesRouter = express.Router();

imagesRouter.get('/:id', imagesControllers.getImage);

module.exports = imagesRouter;
