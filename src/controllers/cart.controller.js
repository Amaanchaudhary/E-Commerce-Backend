import { addCartItem, findUserCart } from '../services/cart.service.js'

export const FindUserCart = async (req, res) => {
    const user = await req.user
    // console.log("Request user:", user);
    if (!user || !user._id) {
        return res.status(400).send({ error: "User not found in request." });
    }
    try {
        const cart = await findUserCart(user._id)
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const AddItemtoCart = async (req, res) => {
    const user = await req.user
    try {
        const cartItem = await addCartItem(user._id, req.body)
        return res.status(200).send(cartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}