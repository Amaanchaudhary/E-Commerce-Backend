import { createOrder, findOrderById, userAllOrder, userOrderHistory } from "../services/order.service.js"

export const CreateOrder = async (req, res) => {
    const user = await req.user
    try {
        let createdOrder = await createOrder(user, req.body)
        res.status(201).send(createdOrder)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const FindOrderById = async (req, res) => {
    // const user = req.user
    try {
        let order = await findOrderById(req.params.id)
        res.status(200).send(order)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const OrderHistory = async (req, res) => {
    const user = await req.user
    try {
        let orderHistory = await userOrderHistory(user._id)
        res.status(200).send(orderHistory)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const userOrders = async (req, res) => {   
         
    const user = await req.user
    try {
        let orderHistory = await userAllOrder(user._id)
        res.status(200).send(orderHistory)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
