import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
    }],
    orderDate: {
        type: Date,
        required : true,
        default : Date.now()
    },
    deliveryDate: {
        type: Date,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
    },
    paymentDetails: {
        paymentMethod:{
            type : String
        },
        transactionId:{
            type : String
        },
        paymentId:{
            type : String
        },
        paymentStatus:{
            type : String,
            default : "PENDING"
        },
    },
    totalPrice : {
        type : Number,
        required : true
    },
    totalDiscountedPrice : {
        type : Number,
        required : true
    },
    discounte : {
        type : Number,
        required : true
    },
    orderStatus : {
        type : String,
        required : true,
        default : "PENDING"
    },
    totalItems : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

export default mongoose.model("orders", orderSchema)