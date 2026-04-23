 #🛍️ Fashion World
 
A full-stack MERN e-commerce application for a fashion store — featuring product browsing, a cart drawer, checkout flow, and order management.
 
🌐 **Live Demo:** [fashion-world-zeta.vercel.app](https://fashion-world-zeta.vercel.app)
 
---
 
## Tech Stack
 
| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Styling | CSS |
| Auth / Session | Browser Session ID |
 
---
 
## Features
 
- 🛒 **Product Browsing** — Browse fashion products with a clean UI
- 🗂️ **Cart Drawer** — Add items, update quantities, and remove products from a slide-in cart
- 💾 **Session-Based Cart** — Cart is persisted in MongoDB using a browser session ID (no login required)
- 📦 **Order Management** — Checkout form with shipping and payment details
- ✅ **Simulated Payment** — Payment processing endpoint that creates an order and clears the cart
- 🌱 **Seed Data** — Product seed script for local development setup
---
 
## Project Structure
 
```
FashionWorld/
├── src/               # React frontend (Vite)
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   └── main.jsx       # App entry point
├── server/            # Express backend
│   ├── routes/        # API route definitions
│   ├── models/        # Mongoose schemas
│   └── index.js       # Server entry point
├── .env.example       # Environment variable template
├── index.html
├── package.json
└── vite.config.js
```
 
---
 
## API Endpoints
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Fetch all products |
| `GET` | `/api/cart/:sessionId` | Get cart for a session |
| `POST` | `/api/cart/:sessionId/items` | Add item to cart |
| `PATCH` | `/api/cart/:sessionId/items/:itemId` | Update item quantity |
| `DELETE` | `/api/cart/:sessionId/items/:itemId` | Remove item from cart |
| `POST` | `/api/orders/checkout` | Process checkout and create order |
 
---
 

 
## Deployment
 
| Service | Purpose |
|---------|---------|
| [Vercel](https://vercel.com) | Frontend hosting |
| [Render](https://render.com) / [Railway](https://railway.app) | Backend hosting |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
 
> Make sure to set your environment variables on the deployment platform before going live.
 
---
 
## Screenshots-
<img width="1349" height="595" alt="Screenshot 2026-04-23 164418" src="https://github.com/user-attachments/assets/f035584d-2723-4fc7-8a63-7d1712beda65" />

<img width="1351" height="589" alt="Screenshot 2026-04-23 164432" src="https://github.com/user-attachments/assets/b85d9758-7104-4f22-ab9b-05b385616a23" />

<img width="1274" height="594" alt="Screenshot 2026-04-23 164520" src="https://github.com/user-attachments/assets/8846d116-d2f1-4389-a4de-96b7c5685981" />

 <img width="1210" height="557" alt="Screenshot 2026-04-23 164559" src="https://github.com/user-attachments/assets/e1d5228d-25ad-4646-8e9b-6a5fb52f3b98" />

 
---
 
## Author
 
**Amar** — [GitHub](https://github.com/Amar2802)
 
