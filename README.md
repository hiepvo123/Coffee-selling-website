# Coffee Selling Website

Simple full-stack project with a Vite frontend and Express backend.

## Backend setup
1. Duplicate `.env.example` to `.env` and set the PostgreSQL connection string:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/coffee
   PORT=5000
   ```
2. Install dependencies and start the API server:
   ```bash
   cd backend
   npm install
   npm run dev # or npm start
   ```
3. The server will create the necessary `products`, `orders`, and `order_items` tables on startup.

## API overview
- `GET /api/products?limit=10&page=1`: list products with pagination metadata.
- `POST /api/products`: create a new product record.
- `GET /api/orders?limit=10&page=1`: list orders with pagination metadata.
- `POST /api/orders`: create an order with optional `items` array (`productId`, `quantity`, `price`).

## Frontend
The frontend lives in `frontend/` and can be started with:
```bash
cd frontend
npm install
npm run dev
```

Vite will print a local URL to view the site.
