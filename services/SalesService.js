const { SalesModel, SalesProductsModel } = require('../models');

function normalize(sale) {
  return {
    saleId: sale.id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  };
}

async function getAll() {
  const [sales] = await SalesModel.getAll();
  return sales.map(normalize);
}

async function getById(id) {
  const [sale] = await SalesModel.getById(id);

  if (!sale.length) return null;

  return sale.map(normalize);
}

async function create(products) {
  const [sale] = await SalesModel.create();

  await Promise.all(
    products.map(({ productId, quantity }) =>
      SalesProductsModel.create(sale.insertId, productId, quantity)),
  );

  return {
    id: sale.insertId,
    itemsSold: products,
  };
}

async function update(id, product) {
  const { productId, quantity } = product[0];

  await SalesProductsModel.update(id, productId, quantity);

  return {
    saleId: id,
    itemUpdated: product,
  };
}

async function remove(id) {
  const [sale] = await SalesModel.getById(id);

  if (!sale.length) return null;

  await SalesModel.remove(id);

  return true;
}

module.exports = { getAll, getById, create, update, remove };
