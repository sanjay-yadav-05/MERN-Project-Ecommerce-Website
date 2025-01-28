import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

dotenv.config();

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Controller to create an order
export const createOrder = async (req, res) => {
    try {
        const { cart, user } = req.body;
        if (!cart || !user) {
            return res.status(400).send({ error: "Cart or user information is missing" });
        }

        let totalAmount = 0;

        // Calculate total amount and validate product quantities
        for (const item of cart) {
            const product = await productModel.findById(item._id);
            if (!product || product.quantity < item.quantity) {
                return res.status(400).send({
                    error: `Insufficient quantity for product: ${item.name} and available quantity is ${product.quantity}`,
                });
            }
            totalAmount += item.price * item.quantity;
        }

        // Create Razorpay order
        const order = await razorpayInstance.orders.create({
            amount: totalAmount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        return res.status(200).send(order);
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).send({ error: "Error creating order" });
    }
};




export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, razorpay_receipt, cart, user } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !razorpay_receipt || !cart || !user) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        // Step 1: Create a string by concatenating order_id and payment_id
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // Step 2: Generate a hash using HMAC SHA256
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body)
            .digest("hex");

        // Step 3: Verify signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).send({ status: "failure", error: "Payment verification failed" });
        }

        // Save order details to the database
        const newOrder = new orderModel({
            userId: user._id,
            products: cart,
            payment: { razorpay_order_id, razorpay_payment_id, razorpay_signature, razorpay_receipt },
            amount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: "pending",
        });
        await newOrder.save();

        // Update product quantities
        for (const item of cart) {
            const product = await productModel.findById(item._id);
            product.quantity -= item.quantity;
            await product.save();
        }

        // Insert order ID into user's allOrders
        const userRecord = await userModel.findById(user._id);
        if (!userRecord) {
            return res.status(404).send({ error: "User not found" });
        }

        userRecord.allOrders.push(newOrder._id);
        await userRecord.save();

        return res.status(200).send({ status: "success" });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).send({ error: "Error verifying payment" });
    }
};


export const fetchAllOrders = async (req, res) => {
    try {
        // Ensure allOrders is always an array
        const orders = await orderModel.find({}).sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        console.error("Error in Fetching Orders:", error);
        res.status(500).send({
            success: false,
            message: "Error in Fetching Orders",
            error: error.message,
        });
    }
};





// Controller to update the status of an order
export const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params; // Order ID from the URL
    const { status } = req.body; // New status from the request body

    // Validate the new status
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    try {
        // Find the order by ID
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Update the order's status
        order.status = status;
        await order.save();

        // Return the updated order
        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update order status" });
    }
};

