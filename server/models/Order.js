import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    shippingAddress: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: "India" }
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    payment: {
      provider: { type: String, required: true, default: "FashionPay Sandbox" },
      transactionId: { type: String, required: true },
      status: { type: String, enum: ["paid", "failed"], required: true },
      last4: { type: String, required: true }
    },
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
