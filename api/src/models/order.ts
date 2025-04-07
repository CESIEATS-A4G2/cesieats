import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  account_id: String,
  status: {
    type: String,
    enum: ["PENDING CONFIRMATION", "IN PREPARATION", "DELIVERY IN PROGRESS", "DONE"],
    default: "PENDING CONFIRMATION"
  },
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  menus: [{
    name: String,
    quantity: Number,
    items: [{
      name: String,
      price: Number
    }]
  }],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

export { Order }