import mongoose, { Schema } from "mongoose";

const reviewsSchema = new Schema({
    review: {
        type: String,
        required : true
    },
    product: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "products",
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

export default mongoose.model("reviews", reviewsSchema)