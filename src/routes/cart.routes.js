import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { AddItemtoCart, FindUserCart } from '../controllers/cart.controller.js';
  
const router = express();

router.get("/", authenticate, FindUserCart )
router.put("/add", authenticate, AddItemtoCart )

export default router
