import { updateCartItem , removeCartItem } from '../services/cartItem.service.js'

export const UpdateCartItem = async (req, res) => {
    const user = await req.user
    try {
        const updatedCartItem = await updateCartItem(user._id , req.params.id , req.body )
        return res.status(200).send(updatedCartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const RemoveCartItem = async (req, res) => {
    const user = await req.user
    try {
        await removeCartItem(user._id , req.params.id )
        return res.status(200).send({message : "Cart Item Removed Successfully"});
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}