import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { RemoveCartItem, UpdateCartItem } from '../controllers/cartItem.controller.js';
  
const router = express();

router.put("/:id", authenticate, UpdateCartItem )
router.delete("/:id", authenticate , RemoveCartItem)

export default router
