import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    products: [{
        description: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    },
    ],
    payment: {},
    status: {
        type: String, default: "pending", enum: ["pending","processing", "shipped", "delivered", "cancelled"]
    }
},
    {
        timestamps: true
    }
);


export default mongoose.model("orders", orderSchema);
