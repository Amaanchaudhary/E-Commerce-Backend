import cartModel from "../Models/cart.model.js"
import cartItemModel from "../Models/cartItem.model.js";
import ProductModel from '../Models/product.model.js'


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
        let cart = await cartModel.findOne({ user: userId })
        if (!cart) {
            throw new Error("Cart not found for user with id: " + userId);
        }
        const cartItems = await cartItemModel.find({ cart: cart?._id }).populate("product");
        if (!cartItems) {
            throw new Error("No cart items found for cart with id: " + cart?._id);
        }  
        cart.cartItems = cartItems
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice
        cart.totalItems = totalItem
        cart.totalDiscountedPrice = totalPrice - totalDiscountedPrice

        return cart;

    } catch (error) {
        throw new Error(error.message)
    }
}

export async function addCartItem(userId, req) {
    try {
        const cart = await cartModel.findOne({ user: userId })
        const product = await ProductModel.findById(req.productId);

        const isPresent = await cartItemModel.findOne({ cart: cart._id, product: product._id, userId })

        if (!isPresent) {
            const cartItem = new cartItemModel({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice
            })

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem)
            await cart.save();
            return "Item added to cart"
        }

    } catch (error) {
        throw new Error(error.message)
    }
}
