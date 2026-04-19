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


The React app runs at `http://localhost:5173` and the API runs at `http://localhost:5000`.

## API

- `GET /api/products`
- `GET /api/cart/:sessionId`
- `POST /api/cart/:sessionId/items`
- `PATCH /api/cart/:sessionId/items/:itemId`
- `DELETE /api/cart/:sessionId/items/:itemId`
- `POST /api/orders/checkout`
