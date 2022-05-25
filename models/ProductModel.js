const connection = require('../db/connection');

function getAll() {
  return connection.query('SELECT * FROM products ORDER BY id');
}

module.exports = { getAll };
