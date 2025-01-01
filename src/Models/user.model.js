import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String ,
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true
    },
    role : {
        type : String ,
        required : true,
        default : "CUSTOMER"
    },
    mobile : {
        type : Number ,
        required: true,
        default: 98900000000
    },
    address : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "addresses"
    }],
    paymentInformation : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "payment_information"
        }
    ],
    ratings : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "ratings"
        }
    ],
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "reviews"
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

export default mongoose.model("users", userSchema)
