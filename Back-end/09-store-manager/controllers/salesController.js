const salesServices = require('../services/salesServices');
const { success } = require('../utils/dictionary/statusCode');

const addSales = async (req, res, next) => {
  try {
    const sales = req.body;
    const saleId = await salesServices.addSales(sales);

    const newSales = {
      _id: saleId,
      itensSold: sales,
    };

    res.status(success).json(newSales);
  } catch (error) {
    console.log(`POST addSales => ${error.message || error.err.message}`);
    next(error);
  }
};

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await salesServices.getAllSales();

    return res.status(success).json(sales);
  } catch (error) {
    console.error(`GET getAllSales => ${error.message || error.err.message}`);
    return next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sale = await salesServices.getSaleById(id);

    return res.status(success).json(sale);
  } catch (error) {
    console.error(`GET getSaleById => ${error.message || error.err.message}`);
    return next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = req.body;

    await salesServices.updateSale(id, sale);
    
    const updatedSale = {
      _id: id,
      itensSold: sale,
    };

    return res.status(success).json(updatedSale);
  } catch (error) {
    console.log(`PUT updateSale => ${error.message || error.err.message}`);
    return next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedSale = await salesServices.deleteSale(id);

    return res.status(success).json(deletedSale);
  } catch (error) {
    console.log(`DELETE deleteSale => ${error.message || error.err.message}`);
    return next(error);
  }
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
