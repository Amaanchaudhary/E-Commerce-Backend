import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { AddAddress, CreateOrder, FindOrderById, OrderHistory, userOrders } from '../controllers/order.controller.js';

const router = express();

router.post("/", authenticate, CreateOrder)
router.post("/address", authenticate, AddAddress)
router.get("/user" , authenticate , OrderHistory)
router.get("/all" , authenticate , userOrders)
router.get("/:id", authenticate, FindOrderById)

export default router
