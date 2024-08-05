import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { CreateRating, GetProductRating } from '../controllers/rating.controller.js';

const router = express();

router.post("/create", authenticate, CreateRating)
router.put("/product/:productId", authenticate, GetProductRating)

export default router
