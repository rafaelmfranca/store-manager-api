const connection = require('../db/connection');

function create(saleId, productId, quantity) {
  return connection.query(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
}

module.exports = { create };
