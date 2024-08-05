import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { FindProductById, GetAllProducts } from '../controllers/product.controller.js';

const router = express();

router.post("/", authenticate, GetAllProducts)
router.get("/id/:id", authenticate , FindProductById)

export default router
