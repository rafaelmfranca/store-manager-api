const connection = require('../db/connection');

function getAll() {
  return connection.query('SELECT * FROM products ORDER BY id');
}

function getById(id) {
  return connection.query('SELECT * FROM products WHERE id = ?', id);
}

module.exports = { getAll, getById };
