const express = require('express');
const { ProductController } = require('../controllers');

const router = express.Router();

router.use('/products', ProductController);

module.exports = router;
