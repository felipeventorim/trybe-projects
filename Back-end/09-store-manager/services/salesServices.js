const salesModel = require('../models/salesModel');

const saleSchema = require('./saleSchema');
const idSchema = require('./idSchema');

const errorHandling = require('../utils/functions/errorHandling');
const { unprocessableEntity, notFound } = require('../utils/dictionary/statusCode');
const {
  invalidData,
  wrongIdOrQuantity,
  saleNotFound,
  notFoundMessage,
  wrongSaleIdFormat,
  stockProblem,
  notPermittedToSell,
} = require('../utils/dictionary/messagesDefault');
const productsModel = require('../models/productsModel');

const validateSaleKeys = (sale) => {
  const { error } = saleSchema.validate(sale);

  if (error) throw errorHandling(unprocessableEntity, invalidData, wrongIdOrQuantity);
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) throw errorHandling(notFound, notFoundMessage, saleNotFound);
};

const updateProductQuantity = async (sales) => {
  const { productId, quantity } = sales[0] || sales.itensSold[0];
  if (sales.itensSold) {
    await productsModel.updateProductQuantity(productId, Number(quantity));
  } else {
    const product = await productsModel.getProductById(productId);

    const stockQuantity = product.quantity;
    if (stockQuantity < quantity) throw errorHandling(notFound, stockProblem, notPermittedToSell);

    await productsModel.updateProductQuantity(productId, Number(`-${quantity}`));
  }
};

// await Promise.all(
//   sales.forEach(async (sale) => {
//     await productsModel.updateProductQuantity(sale.productId, Number(sale.quantity));
//   }),
// );

const addSales = async (sales) => {
  const { error } = saleSchema.validate(sales);

  if (error) throw errorHandling(unprocessableEntity, invalidData, wrongIdOrQuantity);

  await updateProductQuantity(sales);

  const saleId = await salesModel.addSales(sales);

  return saleId;
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return { sales };
};

const getSaleById = async (id) => {
  validateId(id);

  const sale = await salesModel.getSaleById(id);

  if (!sale) throw errorHandling(notFound, notFoundMessage, saleNotFound);

  return sale;
};

const updateSale = async (id, sale) => {
  validateId(id);
  validateSaleKeys(sale);

  await salesModel.updateSale(id, sale);
};

const deleteSale = async (id) => {
  const { error } = idSchema.validate(id);

  if (error) throw errorHandling(unprocessableEntity, invalidData, wrongSaleIdFormat);

  const deletedSale = await salesModel.deleteSale(id);

  if (!deletedSale) throw errorHandling(unprocessableEntity, invalidData, wrongSaleIdFormat);
  
  await updateProductQuantity(deletedSale);

  return deletedSale;
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
