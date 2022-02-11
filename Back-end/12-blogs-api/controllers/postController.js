const { StatusCodes } = require('http-status-codes');

const { validateToken } = require('../auth');
const userService = require('../services/userService');
const postService = require('../services/postService');

const createPost = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const { title, content, categoryIds } = req.body;

    const { email } = validateToken(token);
    
    const { id: userId } = await userService.findUserByEmail(email);

    const post = await postService.createPost({ userId, title, content, categoryIds });

    res.status(StatusCodes.CREATED).json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();

    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await postService.getPost(id);

    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.headers;
    const { title, content, categoryIds } = req.body;

    const post = await postService.updatePost(id, { title, content, categoryIds }, email);

    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.headers;

    await postService.deletePost(id, email);

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const searchPosts = async (req, res, next) => {
  try {
    const { q } = req.query;

    const post = await postService.searchPosts(q);

    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  searchPosts,
};
