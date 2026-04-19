import { Router } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = Router();

async function getCart(sessionId) {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = await Cart.create({ sessionId, items: [] });
  }
  return cart.populate("items.product");
}

function serializeCart(cart) {
  const items = cart.items.map((item) => ({
    _id: item._id,
    product: item.product,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    lineTotal: item.quantity * item.product.price
  }));
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 199;
  const tax = Math.round(subtotal * 0.05);
  return {
    _id: cart._id,
    sessionId: cart.sessionId,
    items,
    totals: {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    }
  };
}

router.get("/:sessionId", async (req, res, next) => {
  try {
    const cart = await getCart(req.params.sessionId);
    res.json(serializeCart(cart));
  } catch (error) {
    next(error);
  }
});

router.post("/:sessionId/items", async (req, res, next) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (!size || !color) return res.status(400).json({ message: "Size and color are required" });

    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { $setOnInsert: { sessionId: req.params.sessionId } },
      { new: true, upsert: true }
    );

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();
    await cart.populate("items.product");
    res.status(201).json(serializeCart(cart));
  } catch (error) {
    next(error);
  }
});

router.patch("/:sessionId/items/:itemId", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.quantity = Math.max(1, Number(req.body.quantity || 1));
    await cart.save();
    await cart.populate("items.product");
    res.json(serializeCart(cart));
  } catch (error) {
    next(error);
  }
});

router.delete("/:sessionId/items/:itemId", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items.pull(req.params.itemId);
    await cart.save();
    await cart.populate("items.product");
    res.json(serializeCart(cart));
  } catch (error) {
    next(error);
  }
});

export default router;
