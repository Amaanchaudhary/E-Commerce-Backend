import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { FindProductById, GetAllProducts } from '../controllers/product.controller.js';

const router = express();

router.get("/", GetAllProducts)
router.get("/id/:id", FindProductById)

export default router
