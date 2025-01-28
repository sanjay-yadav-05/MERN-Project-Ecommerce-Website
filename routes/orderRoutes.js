import express from "express";
import { createOrder, fetchAllOrders, updateOrderStatus, verifyPayment } from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create an order
router.post("/create-order",requireSignIn, createOrder);

// Route to verify payment
router.post("/verify-payment", verifyPayment);


router.get("/fetch-all-orders/", requireSignIn, isAdmin,fetchAllOrders);

router.put('/update-order-status/:orderId', requireSignIn, isAdmin, updateOrderStatus);


export default router;
