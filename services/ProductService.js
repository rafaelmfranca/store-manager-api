const { ProductModel } = require('../models');

function getAll() {
  return ProductModel.getAll();
}

function getById(id) {
  return ProductModel.getById(id);
}

module.exports = { getAll, getById };
