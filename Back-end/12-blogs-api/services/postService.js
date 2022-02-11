const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const categoryService = require('./categoryService');
const { BlogPosts, Users, Categories, PostsCategories } = require('../models');
const postSchema = require('./schemas/postSchema');
const editedPostSchema = require('./schemas/editedPostSchema');

const errorHandling = require('../utils/errors/errorHandling');
const {
  categoryIdsNotFound,
  postNotExist,
  categoriesCannotBeEdited,
  unauthorizedUser,
} = require('../utils/errors/messages');
const { findUserByEmail } = require('./userService');

const OPTIONS = {
  include: [
    { model: Users, as: 'user', attributes: { exclude: 'password' } },
    { model: Categories, as: 'categories', through: { attributes: [] } }],
};

const findPostById = (id) => (BlogPosts.findByPk(id, OPTIONS));

const validatePost = (post) => {
  const { error } = postSchema.validate(post);

  if (error) throw errorHandling(StatusCodes.BAD_REQUEST, error.message);
};

const validateEditedPost = (post) => {
  const { error } = editedPostSchema.validate(post);

  if (error) throw errorHandling(StatusCodes.BAD_REQUEST, error.message);
};

const validateCategoriesList = async (categoriesIds) => {
  const ids = await categoryService.getCategory(categoriesIds);

  if (categoriesIds.length !== ids.length) {
    throw errorHandling(StatusCodes.BAD_REQUEST, categoryIdsNotFound);
  }
};

const handlingCategories = async (postId, categoriesIds) => {
  await validateCategoriesList(categoriesIds);

  const idsRelations = categoriesIds.map((categoryId) => ({ postId, categoryId }));

  await PostsCategories.bulkCreate(idsRelations);
};

const createPost = async (post) => {
  validatePost(post);

  const [published, updated] = [Date.now(), Date.now()];
  
  const createdPost = await BlogPosts.create({ ...post, published, updated });
  
  await handlingCategories(createdPost.id, post.categoryIds);

  return createdPost;
};

const getAllPosts = async () => {
  const posts = await BlogPosts.findAll(OPTIONS);

  return posts;
};

const getPost = async (id) => {
  const post = await findPostById(id);

  if (!post) throw errorHandling(StatusCodes.NOT_FOUND, postNotExist);

  return post;
};

const validateUser = async (id, email) => {
  const user = await findUserByEmail(email);
  const { id: postId } = await getPost(id);

  if (user.id !== postId) throw errorHandling(StatusCodes.UNAUTHORIZED, unauthorizedUser);
};

const updatePost = async (id, post, email) => {
  if (post.categoryIds) throw errorHandling(StatusCodes.BAD_REQUEST, categoriesCannotBeEdited);

  validateEditedPost(post);

  await validateUser(id, email);

  const updated = Date.now();

  await BlogPosts.update(
    { ...post, updated },
    { where: { id } },
  );

  const updatedPost = await findPostById(id);

  return updatedPost;
};

const deletePost = async (id, email) => {
  await validateUser(id, email);

  await BlogPosts.destroy({ where: { id } });
};

const searchPosts = async (queryParam) => {
  const posts = await BlogPosts.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: `%${queryParam}%` },
        content: { [Op.like]: `%${queryParam}%` },
      },
    },
    ...OPTIONS,
  });

  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  searchPosts,
};
