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

module.exports = router;
