import "dotenv/config";
import { connectDb } from "./db.js";
import Product from "./models/Product.js";
import { products } from "./data/products.js";

await connectDb();
await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} Fashion World products`);
process.exit(0);
