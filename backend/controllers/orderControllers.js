import { CustomerOrder } from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const customerOrderData = req.body;

    const newOrder = new CustomerOrder(customerOrderData);

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error processing order:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to save order",
      error: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
