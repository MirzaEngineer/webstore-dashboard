import {
  createOrder,
  getOrders,
} from "../../../controllers/orderControllers.js";

import express from "express";

const router = express.Router();
router.post("/", createOrder);
router.get("/", getOrders);

export default router;
