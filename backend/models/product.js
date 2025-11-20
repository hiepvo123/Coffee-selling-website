const db = require('../db')

async function createProduct(product) {
  const { name, description, price, image, tag } = product
  const query = `
    INSERT INTO products (name, description, price, image, tag)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, description, price, image, tag, created_at;
  `
  const values = [name, description, price, image, tag]
  const { rows } = await db.query(query, values)
  return rows[0]
}

async function listProducts({ limit = 10, offset = 0 }) {
  const { rows } = await db.query(
    `SELECT id, name, description, price, image, tag, created_at
     FROM products
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2;`,
    [limit, offset]
  )

  const countResult = await db.query('SELECT COUNT(*)::int AS count FROM products;')
  const total = countResult.rows[0].count

  return { rows, total }
}

module.exports = {
  createProduct,
  listProducts,
}
