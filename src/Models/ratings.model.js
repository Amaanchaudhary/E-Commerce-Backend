import mongoose, { Schema } from "mongoose";

const ratingsSchema = new Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    product: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "products",
        required : true
    },
    ratings: {
        type: Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

export default mongoose.model("ratings", ratingsSchema)