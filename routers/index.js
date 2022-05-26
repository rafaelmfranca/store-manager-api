const express = require('express');
const { productsRouter, salesRouter } = require('../controllers');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;
