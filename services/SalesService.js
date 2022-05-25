const { SalesModel } = require('../models');

function normalizeSales(sale) {
  return {
    saleId: sale.id,
    date: sale.date,
    productId: sale.id,
    quantity: sale.quantity,
  };
}

function normalizeSale(sale) {
  return {
    date: sale.date,
    productId: sale.id,
    quantity: sale.quantity,
  };
}

async function getAll() {
  const [sales] = await SalesModel.getAll();
  return sales.map(normalizeSales);
}

async function getById(id) {
  const [sale] = await SalesModel.getById(id);

  if (!sale.length) return null;

  return sale.map(normalizeSale);
}

module.exports = { getAll, getById };
