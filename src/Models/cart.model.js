import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartItems",
        required: true,
    }],
    totalPrice: [{
        type: Number,
        required: true,
        default : 0
    }],
    totalItem: {
        type: Number,
        required: true,
        default : 0
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
        default : 0
    },
    discounte: {
        type: Number,
        required: true,
        default : 0
    }
})

export default mongoose.model("cart", cartSchema)