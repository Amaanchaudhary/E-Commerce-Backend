import { createRating , getProductRating } from '../services/rating.service.js'

export const CreateRating = async (req, res) => {
    const user = await req.user
    try {
        const Rating = await createRating(req.body, user)
        return res.status(201).send(Rating)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const GetProductRating = async (req, res) => {
    const productId = req.params.productId
    try {
        const Ratings = await getProductRating(productId)
        return res.status(200).send(Ratings)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}