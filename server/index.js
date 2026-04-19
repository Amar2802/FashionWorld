import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "./db.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Fashion World API" });
});

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Server error" });
});

connectDb()
  .then(() => {
    app.listen(port, () => console.log(`Fashion World API running on port ${port}`));
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
