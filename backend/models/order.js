const db = require('../db')

async function createOrder(order) {
  const { customerName, customerEmail, status = 'pending', total, items = [] } = order

  const { rows } = await db.query(
    `INSERT INTO orders (customer_name, customer_email, status, total)
     VALUES ($1, $2, $3, $4)
     RETURNING id, customer_name, customer_email, status, total, created_at;`,
    [customerName, customerEmail, status, total]
  )

  const createdOrder = rows[0]

  if (items.length) {
    const itemInsertQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING id, order_id, product_id, quantity, price;
    `

    for (const item of items) {
      const { productId, quantity, price } = item
      await db.query(itemInsertQuery, [createdOrder.id, productId, quantity, price])
    }
  }

  return createdOrder
}

async function listOrders({ limit = 10, offset = 0 }) {
  const { rows } = await db.query(
    `SELECT id, customer_name, customer_email, status, total, created_at
     FROM orders
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2;`,
    [limit, offset]
  )

  const countResult = await db.query('SELECT COUNT(*)::int AS count FROM orders;')
  const total = countResult.rows[0].count

  return { rows, total }
}

module.exports = {
  createOrder,
  listOrders,
}
