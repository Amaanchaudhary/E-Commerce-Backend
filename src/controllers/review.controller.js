import { createReview , getAllReview } from '../services/review.service.js'

export const CreateReview = async (req, res) => {
    const user = await req.user
    try {
        const review = await createReview(req.body, user)
        return res.status(201).send(review)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const GetAllReview = async (req, res) => {
    const productId = req.params.productId
    try {
        const reviews = await getAllReview(productId)
        return res.status(200).send(reviews)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}