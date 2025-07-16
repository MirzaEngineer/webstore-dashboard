import mongoose from "mongoose";
const shippingFormSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  city: String,
  country: String,
  zip: String,
  date: Date,
});

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
});

const customerorderSchema = new mongoose.Schema(
  {
    cartItems: [cartItemSchema],
    shippingFee: Number,
    tax: Number,
    totalAmount: Number,
    totalPrice: Number,
    shippingForm: shippingFormSchema,
    status: {
      type: String,
      enum: ["pending", "delivered", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const CustomerOrder = mongoose.model(
  "CustomerOrder",
  customerorderSchema
);
