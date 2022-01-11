const productsServices = require('../services/productsServices');
const { success, created } = require('../utils/dictionary/statusCode');

const addProduct = async (req, res, next) => {
  try {
      const { name, quantity } = req.body;
      const insertedId = await productsServices.addProduct(name, quantity);

      const newProduct = { _id: insertedId, name, quantity };

      return res.status(created).json(newProduct);
  } catch (error) {
      console.error(`POST addProduct => ${error.err.message}`);
      return next(error);
  }
};

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await productsServices.getAllProducts();

    return res.status(success).json(products);
  } catch (error) {
    console.error(`GET getAllProducts => ${error.message}`);
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productsServices.getProductById(id);

    return res.status(success).json(product);
  } catch (error) {
    console.error(`GET getProductById => ${error.message}`);
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await productsServices.updateProduct(id, name, quantity);
    
    const updatedProduct = { _id: id, name, quantity };

    return res.status(success).json(updatedProduct);
  } catch (error) {
    console.log(`PUT updateProduct => ${error.message}`);
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productsServices.deleteProduct(id);

    return res.status(success).json(deletedProduct);
  } catch (error) {
    console.log(`DELETE deleteProduct => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
