const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const validateProduct = require('../middlewares/validateProduct');
const { ProductsService } = require('../services');

const productsRouter = express.Router();

async function getAll(_req, res) {
  const [products] = await ProductsService.getAll();
  return res.status(StatusCodes.OK).json(products);
}

async function create(req, res, next) {
  const newProduct = await ProductsService.create(req.body);

  if (!newProduct) {
    return next({
      status: StatusCodes.CONFLICT,
      message: 'Product already exists',
    });
  }

  return res.status(StatusCodes.CREATED).json(newProduct);
}

async function getById(req, res, next) {
  const [product] = await ProductsService.getById(req.params.id);

  if (!product.length) {
    return next({
      status: StatusCodes.NOT_FOUND,
      message: 'Product not found',
    });
  }

  return res.status(StatusCodes.OK).json(product[0]);
}

async function update(req, res, next) {
  const { id } = req.params;
  const updatedProduct = await ProductsService.update(id, req.body);

  if (!updatedProduct) {
    return next({
      status: StatusCodes.NOT_FOUND,
      message: 'Product not found',
    });
  }

  return res.status(StatusCodes.OK).json(updatedProduct);
}

async function remove(req, res, next) {
  const response = await ProductsService.remove(req.params.id);

  if (!response) {
    return next({
      status: StatusCodes.NOT_FOUND,
      message: 'Product not found',
    });
  }

  return res.status(StatusCodes.NO_CONTENT).end();
}

productsRouter
  .route('/')
  .get(rescue(getAll))
  .post(validateProduct, rescue(create));

productsRouter
  .route('/:id')
  .get(rescue(getById))
  .put(validateProduct, rescue(update))
  .delete(rescue(remove));

module.exports = { productsRouter, getAll, create, getById, update, remove };
