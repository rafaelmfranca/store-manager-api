const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const validateSale = require('../middlewares/validateSale');
const { SalesService } = require('../services');

const router = express.Router();

router
  .route('/')
  .get(
    rescue(async (_req, res) => {
      const sales = await SalesService.getAll();
      return res.status(StatusCodes.OK).json(sales);
    }),
  )
  .post(
    validateSale,
    rescue(async (req, res) => {
      res.status(StatusCodes.CREATED).end();
    }),
  );

router
  .route('/:id')
  .get(
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
  )
  .put(
    validateSale,
    rescue(async (req, res) => {
      res.status(StatusCodes.OK).end();
    }),
  );

module.exports = router;
