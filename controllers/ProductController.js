const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const { ProductService } = require('../services');

const router = express.Router();

router.route('/').get(
  rescue(async (_req, res) => {
    const [products] = await ProductService.getAll();
    return res.status(StatusCodes.OK).json(products);
  }),
);

router.route('/:id').get(
  rescue(async (req, res, next) => {
    const [product] = await ProductService.getById(req.params.id);

    if (!product.length) {
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Product not found',
      });
    }

    return res.status(StatusCodes.OK).json(product[0]);
  }),
);

module.exports = router;
