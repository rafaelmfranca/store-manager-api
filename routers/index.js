const express = require('express');
const { ProductsController, SalesController } = require('../controllers');

const router = express.Router();

router.use('/products', ProductsController);
router.use('/sales', SalesController);

module.exports = router;
