import { getAllOrders, confirmedOrder } from '../services/order.service.js'

export const GetAllOrders = async (req, res) => {
    try {
        const orders = await getAllOrders()
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const ConfirmedOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const order = await confirmedOrder(orderId)
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const ShippedOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const order = await shippedOrder(orderId)
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const DeliveredOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const order = await deliveredOrder(orderId)
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const CancelledOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const order = await cancelledOrder(orderId)
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const DeleteOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const order = await deleteOrder(orderId)
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}