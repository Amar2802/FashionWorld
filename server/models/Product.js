import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    material: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    sizes: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    tags: [{ type: String, required: true }],
    stock: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
