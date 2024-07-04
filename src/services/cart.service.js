import cartModel from "../Models/cart.model.js"

async function createCart(user){
    try{

        const cart = new cartModel({user})
        const createdCart = await cart.save();
        return createdCart
    }catch(error){
        throw new Error(error.message)
    }
}

export default createCart