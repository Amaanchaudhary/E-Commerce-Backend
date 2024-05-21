import mongoose from "mongoose"

const mongoURL = "mongodb+srv://chaudharyamaan982:JU6OZZ3RV4Ua4z3N@cluster0.zcrtj04.mongodb.net/ECommerceWebsite"

const connectDb = () => {
    return mongoose.connect(mongoURL)
}

export default connectDb