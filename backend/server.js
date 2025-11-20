const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const { initDatabase } = require('./db')
const { listProducts, createProduct } = require('./models/product')
const { listOrders, createOrder } = require('./models/order')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend server is running!')
})

app.get('/api/products', async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50)
    const offset = (page - 1) * limit

    const result = await listProducts({ limit, offset })
    res.json({
      data: result.rows,
      pagination: {
        page,
        limit,
        total: result.total,
      },
    })
  } catch (error) {
    next(error)
  }
})

app.post('/api/products', async (req, res, next) => {
  try {
    const product = await createProduct(req.body)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

app.get('/api/orders', async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50)
    const offset = (page - 1) * limit

    const result = await listOrders({ limit, offset })
    res.json({
      data: result.rows,
      pagination: {
        page,
        limit,
        total: result.total,
      },
    })
  } catch (error) {
    next(error)
  }
})

app.post('/api/orders', async (req, res, next) => {
  try {
    const order = await createOrder(req.body)
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Unexpected server error' })
})

async function start() {
  await initDatabase()
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start().catch((err) => {
  console.error('Failed to start server', err)
  process.exit(1)
})
