import ratingsModel from "../Models/ratings.model.js";
import { findProductById } from "./product.service.js";

export async function createRating(req  , user){
    const product = await findProductById(req.productId)

    const rating = new ratingsModel({
        product : product._id,
        user : user._id,
        rating : req.rating,
        createdAt : new Date()
    })

    return await rating.save()
}

export async function getProductRating(productId){
    return await ratingsModel.find({product : productId})
}
