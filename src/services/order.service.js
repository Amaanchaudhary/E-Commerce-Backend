import { addCartItem, findUserCart } from './cart.service.js'
import addressModel from '../Models/address.model.js'
import orderModel from '../Models/order.model.js';
import orderItemsModel from '../Models/orderItems.model.js'

export async function createOrder(user, shipAddress) {
    let address;

    if (shipAddress._id) {
        let existAddress = await addressModel.findById(shipAddress._id)
        address = existAddress
    }
    else {
        address = new addressModel(shipAddress)
        address.user = user
        await address.save();

        user.address.push(address)
        await user.save();
    }

    const cart = await findUserCart(user._id)
    const orderItems = []

    for (let item of cart.cartItems) {
        const orderItem = new orderItemsModel({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice
        })

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem)
    }

    const createdOrder = new orderModel({
        user: user._id,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discounte: cart.discounte,
        totalItems: cart.totalItems,
        shippingAddress: address._id
    })

    const savedOrder = await createdOrder.save();

    return savedOrder;
}

export async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";

    return await order.save();
}

export async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    return await order.save();
}

export async function shippedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    return await order.save();
}

export async function deliveredOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "DELIVERED";

    return await order.save();
}

export async function cancelledOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    return await order.save();
}

export async function findOrderById(orderId) {

    const order = await orderModel.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")

    return order

}

export async function userOrderHistory(userId) {
    try {
        const orders = await orderModel.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean();

        return orders
    } catch (error) {
        throw new Error(error.message)
    }

}

export async function getAllOrders() {
    const allOrders = await orderModel.find()
        .populate("user")
        .populate("shippingAddress")
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()

    if (!allOrders) {
        throw new Error('Orders not found');
    }

    return allOrders
}

export async function deleteOrder(orderId) {
    const order = await findOrderById(orderId)
    if (!order) {
        throw new Error('Order not found');
    }
    await orderModel.findByIdAndDelete(order._id)
}


