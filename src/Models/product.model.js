import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    price: {
        type: Number,
        required : true
    },
    discountedPrice: {
        type: Number,
        // required : true
    },
    discountPercent: {
        type: Number,
        // required : true
    },
    quantity: {
        type: Number,
        required : true
    },
    brand : {
        type : String
    },
    color : {
        type : String
    },
    sizes : [{
        name : {type : String},
        quantity : {type : String}
    }],
    imageUrl : {
        type : String
    },
    rating : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "ratings"
    }],
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "reviews"
    }],
    numRatings : {
        type : Number,
        default : 0
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "categories"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

export default mongoose.model("products", productSchema)