import mongoose, { model } from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    setHint :{
        type: String,
        required:true
    },
    hint :{
        type: String,
        required:true
    },
    address :{
        type: String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
    ,
    cart:{
        type: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true },
            }
        ],
        default: [],
    }

}, { timestamps: true });

export default mongoose.model('users', userSchema);