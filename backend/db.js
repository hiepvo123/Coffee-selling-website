const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Please define it in your environment variables.')
}

const pool = new Pool({
  connectionString,
})

async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      image TEXT,
      tag TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      status TEXT DEFAULT 'pending',
      total NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL DEFAULT 1,
      price NUMERIC(10, 2) NOT NULL
    );
  `)
}

function query(text, params) {
  return pool.query(text, params)
}

module.exports = {
  pool,
  query,
  initDatabase,
}
