const connection = require('../db/connection');

function getAll() {
  return connection.query(
    `SELECT s.id, s.date, sp.product_id, sp.quantity
     FROM sales AS s
     INNER JOIN sales_products AS sp
     ON s.id = sp.sale_id
     ORDER BY s.id , sp.product_id`,
  );
}

function getById(id) {
  return connection.query(`
    SELECT 
      s.date, sp.product_id, sp.quantity
    FROM
      sales AS s
    INNER JOIN
      sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ${id}
    ORDER BY sp.product_id`);
}

function create() {
  return connection.query('INSERT INTO sales (date) VALUES (NOW())');
}

function remove(id) {
  return connection.query('DELETE FROM sales WHERE id = ?', [id]);
}

module.exports = { getAll, getById, create, remove };
