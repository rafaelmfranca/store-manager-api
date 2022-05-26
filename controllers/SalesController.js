const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const validateSale = require('../middlewares/validateSale');
const { SalesService } = require('../services');

const salesRouter = express.Router();

async function getAll(_req, res) {
  const sales = await SalesService.getAll();
  return res.status(StatusCodes.OK).json(sales);
}

async function create(req, res, next) {
  const saleResume = await SalesService.create(req.body);

  if (!saleResume) {
    return next({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Such amount is not permitted to sell',
    });
  }

  return res.status(StatusCodes.CREATED).json(saleResume);
}

async function getById(req, res, next) {
  const sale = await SalesService.getById(req.params.id);

  if (!sale) {
    return next({
      status: StatusCodes.NOT_FOUND,
      message: 'Sale not found',
    });
  }

  return res.status(StatusCodes.OK).json(sale);
}

async function update(req, res) {
  const { id } = req.params;

  const updatedSaleResume = await SalesService.update(id, req.body);

  res.status(StatusCodes.OK).json(updatedSaleResume);
}

async function remove(req, res, next) {
  const { id } = req.params;

  const response = await SalesService.remove(id);

  if (!response) {
    return next({
      status: StatusCodes.NOT_FOUND,
      message: 'Sale not found',
    });
  }

  return res.status(StatusCodes.NO_CONTENT).end();
}

salesRouter.route('/').get(rescue(getAll)).post(validateSale, rescue(create));

salesRouter
  .route('/:id')
  .get(rescue(getById))
  .put(validateSale, rescue(update))
  .delete(rescue(remove));

module.exports = { salesRouter, getAll, create, getById, update, remove };
