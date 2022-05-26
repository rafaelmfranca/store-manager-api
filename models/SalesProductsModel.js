const connection = require('../db/connection');

function create(saleId, productId, quantity) {
  return connection.query(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
}

function update(saleId, productId, quantity) {
  return connection.query(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
}

module.exports = { create, update };
