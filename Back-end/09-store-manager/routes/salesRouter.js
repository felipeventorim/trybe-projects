const express = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/:id', salesController.getSaleById);

salesRouter.put('/:id', salesController.updateSale);

salesRouter.delete('/:id', salesController.deleteSale);

salesRouter.get('/', salesController.getAllSales);

salesRouter.post('/', salesController.addSales);

module.exports = salesRouter;
