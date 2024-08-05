import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { GetAllOrders , ConfirmedOrder, ShippedOrder, DeliveredOrder, CancelledOrder, DeleteOrder} from '../controllers/adminOrder.controller.js';
  
const router = express();

router.get("/", authenticate, GetAllOrders )
router.put("/:orderId/confirmed", authenticate , ConfirmedOrder)
router.put("/:orderId/ship", authenticate , ShippedOrder)
router.put("/:orderId/deliver", authenticate , DeliveredOrder)
router.put("/:orderId/cancel", authenticate , CancelledOrder)
router.put("/:orderId/delete", authenticate , DeleteOrder)

export default router
