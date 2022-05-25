const connection = require('../db/connection');

function getAll() {
  return connection.query('SELECT * FROM products ORDER BY id');
}

function getById(id) {
  return connection.query('SELECT * FROM products WHERE id = ?', id);
}

function getByName(name) {
  return connection.query('SELECT * FROM products WHERE name = ?', name);
}

function create(name, quantity) {
  return connection.query(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
}

module.exports = { getAll, getById, getByName, create };
