const { ProductModel } = require('../models');

function getAll() {
  return ProductModel.getAll();
}

module.exports = { getAll };
