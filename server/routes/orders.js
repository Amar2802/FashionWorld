import { Router } from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = Router();

function moneyTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  const shipping = subtotal > 4999 ? 0 : 199;
  const tax = Math.round(subtotal * 0.05);
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

function createPayment(cardNumber) {
  const digits = String(cardNumber || "").replace(/\D/g, "");
  if (digits.length < 12) {
    return { status: "failed", message: "Enter a valid card number for sandbox payment." };
  }
  return {
    status: "paid",
    transactionId: `FW-${Date.now()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
    last4: digits.slice(-4)
  };
}

router.post("/checkout", async (req, res, next) => {
  try {
    const { sessionId, customer, shippingAddress, payment } = req.body;
    if (!sessionId || !customer || !shippingAddress || !payment) {
      return res.status(400).json({ message: "Checkout details are incomplete." });
    }

    const cart = await Cart.findOne({ sessionId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        return res.status(409).json({ message: `${item.product.name} has only ${item.product.stock} in stock.` });
      }
    }

    const paymentResult = createPayment(payment.cardNumber);
    if (paymentResult.status === "failed") {
      return res.status(402).json({ message: paymentResult.message });
    }

    const totals = moneyTotals(cart.items);
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      price: item.product.price
    }));

    const order = await Order.create({
      sessionId,
      customer,
      shippingAddress,
      items: orderItems,
      ...totals,
      payment: {
        provider: "FashionPay Sandbox",
        status: paymentResult.status,
        transactionId: paymentResult.transactionId,
        last4: paymentResult.last4
      }
    });

    await Promise.all(
      cart.items.map((item) =>
        Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } })
      )
    );

    cart.items = [];
    await cart.save();

    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
});

router.get("/session/:sessionId", async (req, res, next) => {
  try {
    const orders = await Order.find({ sessionId: req.params.sessionId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

export default router;
