const { ProductsModel } = require('../models');

function getAll() {
  return ProductsModel.getAll();
}

function getById(id) {
  return ProductsModel.getById(id);
}

module.exports = { getAll, getById };
