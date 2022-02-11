const express = require('express');

const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const postController = require('../controllers/postController');

const postRouter = express.Router();

postRouter.get('/', validateTokenMiddleware, postController.getAllPosts);

postRouter.get('/search', validateTokenMiddleware, postController.searchPosts);

postRouter.get('/:id', validateTokenMiddleware, postController.getPost);

postRouter.post('/', validateTokenMiddleware, postController.createPost);

postRouter.put('/:id', validateTokenMiddleware, postController.updatePost);

postRouter.delete('/:id', validateTokenMiddleware, postController.deletePost);

module.exports = postRouter;
