const { SalesModel } = require('../models');

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

module.exports = { getAll, getById };
