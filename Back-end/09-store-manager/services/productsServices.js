const productsModel = require('../models/productsModel');

const productSchema = require('./productSchema');
const idSchema = require('./idSchema');

const errorHandling = require('../utils/functions/errorHandling');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const { invalidData, wrongIdFormat } = require('../utils/dictionary/messagesDefault');

const validateProductKeys = (product) => {
  const { error } = productSchema.validate(product);

  if (error) throw errorHandling(unprocessableEntity, invalidData, error.message);
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) throw errorHandling(unprocessableEntity, invalidData, wrongIdFormat);
};

const addProduct = async (name, quantity) => {
  validateProductKeys({ name, quantity });

  const id = await productsModel.addProduct(name, quantity);

  return id;
};

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();

  return { products };
};

const getProductById = async (id) => {
  validateId(id);

  const product = await productsModel.getProductById(id);

  if (!product) throw errorHandling(unprocessableEntity, invalidData, wrongIdFormat);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  validateId(id);
  validateProductKeys({ name, quantity });

  await productsModel.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  validateId(id);

  const deletedProduct = await productsModel.deleteProduct(id);

  if (!deletedProduct) throw errorHandling(unprocessableEntity, invalidData, wrongIdFormat);

  return deletedProduct;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
