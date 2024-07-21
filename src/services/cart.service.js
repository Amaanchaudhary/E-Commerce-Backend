import cartModel from "../Models/cart.model.js"
import cartItemsModel from "../Models/cartItem.model.js"


export async function createCart(user) {
    try {
        const cart = new cartModel({ user })
        const createdCart = await cart.save();
        return createdCart
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function findUserCart(userId) {
    try {
        let cart = await cartModel.findOne({ user : user })
        const cartItems = await cartItemsModel.find({cart : cart._id}).populate("product");
        cart.cartItems = cartItems
        let totalPrice = 0
        
    } catch (error) {
        throw new Error(error.message)
    }
}
