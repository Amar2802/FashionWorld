import { Router } from "express";
import Product from "../models/Product.js";
import { products as seedProducts } from "../data/products.js";

const router = Router();

async function ensureProducts() {
  const count = await Product.countDocuments();
  if (count < seedProducts.length) {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
  }
}

router.get("/", async (req, res, next) => {
  try {
    await ensureProducts();
    const { category, q, sort, min, max } = req.query;
    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (q) {
      const search = new RegExp(q, "i");
      filter.$or = [
        { name: search },
        { brand: search },
        { category: search },
        { description: search },
        { material: search },
        { tags: search }
      ];
    }

    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    const sortMap = {
      newest: { createdAt: -1 },
      priceLow: { price: 1 },
      priceHigh: { price: -1 },
      rating: { rating: -1 }
    };

    const products = await Product.find(filter).sort(sortMap[sort] || sortMap.newest).limit(48);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

export default router;
