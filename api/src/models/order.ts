import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  account_id: String,
  restaurant_id: String,
  restaurant_address: String,
  delivery_adress: String,
  status: {
    type: String,
    enum: ["PENDING_CONFIRMATION", "IN_PREPARATION", "DELIVERY_IN_PROGRESS", "DONE"],
    default: "PENDING_CONFIRMATION"
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