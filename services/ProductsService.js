const { ProductsModel } = require('../models');

function getAll() {
  return ProductsModel.getAll();
}

function getById(id) {
  return ProductsModel.getById(id);
}

async function create({ name, quantity }) {
  const [product] = await ProductsModel.getByName(name);

  if (product.length) return false;

  const [newProduct] = await ProductsModel.create(name, quantity);

  return {
    id: newProduct.insertId,
    name,
    quantity,
  };
}

async function update(id, { name, quantity }) {
  const [product] = await ProductsModel.getById(id);

  if (!product.length) return false;

  await ProductsModel.update(id, name, quantity);

  return {
    id,
    name,
    quantity,
  };
}

module.exports = { getAll, getById, create, update };
