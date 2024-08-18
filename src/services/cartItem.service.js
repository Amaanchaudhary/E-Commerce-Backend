import cartItemModel from '../Models/cartItem.model.js';
import { findUserById } from './user.service.js'

export async function updateCartItem(userId, cartItemId, cartItemData) {
    
    try {
        const item = await findCartItemById(cartItemId);
        
        if (!item) {
            throw new Error("Cart item not found : ", cartItemId)
        }

        const user = await findUserById(item.userId);        

        if (!user) {
            throw new Error("User Not Found : ", userId)
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData?.quantity

            if (typeof item.product.price !== 'number' || typeof item.product.discountedPrice !== 'number') {
                throw new Error("Invalid product price or discounted price");
            }

            item.price = item.quantity * item.product.price
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        }
        else {
            throw new Error("You cant updated this cart item")
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

export async function removeCartItem(userId, cartItemId) {
    try {
        const cartitem = await findCartItemById(cartItemId)
        const user = await findUserById(userId);

        if (cartitem.userId.toString() === user._id.toString()) {
            return await cartItemModel.findByIdAndDelete(cartItemId)
        }

        throw new Error("You Cant remove another user's item")

    } catch (error) {
        throw new Error(error.message)
    }
}

export async function findCartItemById(cartItemId) {
    try {
        const cartItem = await cartItemModel.findById(cartItemId)

        if (cartItem) {
            return cartItem
        } else {
            throw new Error("Cart Item not found with id : ",cartItemId)
        }

    } catch (error) {
        throw new Error(error.message)
    }
}
