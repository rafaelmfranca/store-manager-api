const express = require('express');
const { ProductsController } = require('../controllers');

const router = express.Router();

router.use('/products', ProductsController);

module.exports = router;
