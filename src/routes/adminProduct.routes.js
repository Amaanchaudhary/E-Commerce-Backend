import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { CreateMultipleProducts, CreateProduct, DeleteProduct, UpdateProduct } from '../controllers/product.controller.js';

const router = express();

router.post("/", authenticate, CreateProduct)
router.post("/creates", authenticate , CreateMultipleProducts)
router.delete("/:id", authenticate, DeleteProduct)
router.put("/:id", authenticate, UpdateProduct) 


export default router
