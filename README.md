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
 
## Getting Started
 
### Prerequisites
 
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
### 1. Clone the repository
 
```bash
git clone https://github.com/Amar2802/FashionWorld.git
cd FashionWorld
```
 
### 2. Set up environment variables
 
```bash
cp .env.example .env
```
 
Open `.env` and fill in your values:
 
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
 
### 3. Install dependencies
 
**Frontend:**
```bash
npm install
```
 
**Backend:**
```bash
cd server
npm install
```
 
### 4. Seed the database (optional)
 
```bash
cd server
node seed.js
```
 
### 5. Run the app
 
**Backend** (from `/server`):
```bash
npm start
```
 
**Frontend** (from root):
```bash
npm run dev
```
 
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)
---
 
## Deployment
 
| Service | Purpose |
|---------|---------|
| [Vercel](https://vercel.com) | Frontend hosting |
| [Render](https://render.com) / [Railway](https://railway.app) | Backend hosting |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
 
> Make sure to set your environment variables on the deployment platform before going live.
 
---
 
## Screenshots
 
> _Add screenshots or a demo GIF of the app here._
 
---
 
## Author
 
**Amar** — [GitHub](https://github.com/Amar2802)
 
