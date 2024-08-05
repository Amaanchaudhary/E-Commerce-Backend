import productModel from "../Models/product.model.js";
import reviewsModel from "../Models/reviews.model.js";
import { findProductById } from "./product.service.js";

export async function createReview(reqData, user) {
    const product = await findProductById(reqData.productId)

    const review = new reviewsModel({
        user: user._id,
        product: product._id,
        review: reqData.review,
        createdAt: new Date()
    })

    await product.save();
    return await review.save()
}


export async function getAllReview(productId) {
    const product = await findProductById(reqData.productId)
    return await reviewsModel.find({ product: productId }).populate("user")
}
