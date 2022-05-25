const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const validateProduct = require('../middlewares/validateProduct');
const { ProductsService } = require('../services');

const router = express.Router();

router
  .route('/')
  .get(
    rescue(async (_req, res) => {
      const [products] = await ProductsService.getAll();
      return res.status(StatusCodes.OK).json(products);
    }),
  )
  .post(
    validateProduct,
    rescue(async (req, res, next) => {
      const newProduct = await ProductsService.create(req.body);

      if (!newProduct) {
        return next({
          status: StatusCodes.CONFLICT,
          message: 'Product already exists',
        });
      }

      res.status(StatusCodes.CREATED).json(newProduct);
    }),
  );

router
  .route('/:id')
  .get(
    rescue(async (req, res, next) => {
      const [product] = await ProductsService.getById(req.params.id);

      if (!product.length) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: 'Product not found',
        });
      }

      return res.status(StatusCodes.OK).json(product[0]);
    }),
  )
  .put(
    validateProduct,
    rescue(async (req, res) => {
      res.status(StatusCodes.OK).end();
    }),
  );

module.exports = router;
