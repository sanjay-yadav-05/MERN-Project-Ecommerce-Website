import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext.jsx";
import { useCart } from "../context/cartContext.jsx";
import { useNavigate } from "react-router-dom";

const PaymentButton = ({ amount }) => {
    const { auth } = useAuth();
    const { cart, setCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false); // State to track processing status
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            setIsProcessing(true); // Set processing to true

            // Step 1: Call the backend to create an order
            const { data: order } = await axios.post(
                "http://localhost:8080/api/v1/order/create-order",
                {
                    cart,
                    user: auth?.user,
                }
            );

            // Step 2: Define Razorpay payment options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_ID_KEY, // Securely use environment variable
                amount: order.amount,
                currency: order.currency,
                name: "BrandName", // Replace with your brand name
                description: "Purchase",
                image: "/favicon.ico", // Ensure the favicon path is correct
                order_id: order.id, // Razorpay order ID from backend
                handler: async function (response) {
                    try {
                        // Step 3: Verify the payment with the backend
                        const verificationResponse = await axios.post(
                            "http://localhost:8080/api/v1/order/verify-payment",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                razorpay_receipt: order.receipt,
                                cart,
                                user: auth?.user,
                            }
                        );
                        // Handle verification response
                        if (verificationResponse.data.status === "success") {
                            // const c = localStorage.getItem("cart");
                            // const parsedCart = c ? JSON.parse(c) : []; // Parse the cart data or set it as an empty array if null
                            // axios.post(`http://localhost:8080/api/v1/auth/insert-order/${auth.user._id}`, parsedCart)
                            //     .then((response) => {
                            //         console.log("Cart data successfully stored:", response.data);
                            //     })
                            //     .catch((error) => {
                            //         console.error("Error storing cart data:", error);
                            //     });
                            // localStorage.removeItem("cart");
                            // setCart([]);
                            alert("Payment successful!");

                            axios.post(`http://localhost:8080/api/v1/auth/store-cart/${auth.user._id}`, [])
                                .then((response) => {
                                    console.log("Cart data successfully stored:", response.data);
                                })
                                .catch((error) => {
                                    console.error("Error storing cart data:", error);
                                });
                                localStorage.removeItem("cart");
                                setCart([]);
                            navigate("/dashboard/user/all-orders")
                        } else {
                            alert("Payment verification failed!");
                        }
                    } catch (error) {
                        console.error("Error verifying payment:", error.response.data.error);
                        alert(error.response.data.error);
                    } finally {
                        setIsProcessing(false); // Reset processing state
                    }
                },
                prefill: {
                    name: auth?.user?.name || "Guest", // Fallback values for prefill
                    email: auth?.user?.email || "guest@example.com",
                    contact: auth?.user?.phone || "0000000000",
                },
                theme: {
                    color: "#3399cc", // Customize the Razorpay modal theme color
                },
                modal: {
                    // Event triggered when the user closes the Razorpay modal
                    ondismiss: function () {
                        setIsProcessing(false); // Reset processing state when modal is closed
                        alert("Payment process was cancelled.");
                    },
                },
            };

            // Step 4: Open the Razorpay payment modal
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error initiating payment:", error.response?.data?.error || error.message);
            alert(error.response?.data?.error || "Error initiating payment. Please try again.");
            setIsProcessing(false); // Reset processing state on error
        }
    };

    return (
        <button
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isProcessing ? "cursor-not-allowed opacity-70" : ""
                }`}
            onClick={isProcessing ? null : handlePayment} // Disable button while processing
            disabled={isProcessing} // Disable button while processing
        >
            {isProcessing ? "Processing..." : "Pay Now"}
        </button>
    );
};

export default PaymentButton;
