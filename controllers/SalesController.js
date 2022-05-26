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
      const saleResume = await SalesService.create(req.body);
      return res.status(StatusCodes.CREATED).json(saleResume);
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
      const { id } = req.params;

      const updatedSaleResume = await SalesService.update(id, req.body);

      res.status(StatusCodes.OK).json(updatedSaleResume);
    }),
  )
  .delete(
    rescue(async (req, res, next) => {
      const { id } = req.params;

      const response = await SalesService.remove(id);

      if (!response) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: 'Sale not found',
        });
      }

      return res.status(StatusCodes.NO_CONTENT).end();
    }),
  );

module.exports = router;
