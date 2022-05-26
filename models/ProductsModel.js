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

function update(id, name, quantity) {
  return connection.query(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
}

function remove(id) {
  return connection.query('DELETE FROM products WHERE id = ?', id);
}

function updateQuantity(id, quantity, type) {
  return connection.query(
    `UPDATE products SET quantity = quantity ${type} ${quantity} WHERE id = ${id}`,
  );
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove,
  updateQuantity,
};
