# Fashion World

A MERN ecommerce application focused on cart and payment flow for a fashion store.

## Features

- React product browsing and cart drawer
- Cart stored in MongoDB by browser session id
- Quantity updates and item removal
- Checkout form with shipping and payment details
- Simulated payment processing endpoint
- MongoDB order creation and cart clearing
- Product seed data for local development

## Run Locally

1. Copy `.env.example` to `.env`.
2. Make sure MongoDB is running locally or update `MONGODB_URI`.
3. Install dependencies:

```bash
npm install
```

4. Start the app:

```bash
npm run dev
```

The React app runs at `http://localhost:5173` and the API runs at `http://localhost:5000`.

## API

- `GET /api/products`
- `GET /api/cart/:sessionId`
- `POST /api/cart/:sessionId/items`
- `PATCH /api/cart/:sessionId/items/:itemId`
- `DELETE /api/cart/:sessionId/items/:itemId`
- `POST /api/orders/checkout`
