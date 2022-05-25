const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const { SalesService } = require('../services');

const router = express.Router();

router.route('/').get(
  rescue(async (_req, res) => {
    const sales = await SalesService.getAll();
    return res.status(StatusCodes.OK).json(sales);
  }),
);

router.route('/:id').get(
  rescue(async (req, res, next) => {
    const sale = await SalesService.getById(req.params.id);

    if (!sale) {
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Sale not found',
      });
    }

    return res.status(StatusCodes.OK).json(sale);
  }),
);

module.exports = router;
