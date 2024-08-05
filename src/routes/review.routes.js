import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { CreateReview, GetAllReview } from '../controllers/review.controller.js';

const router = express();

router.post("/create", authenticate, CreateReview)
router.get("/product/:productId", authenticate, GetAllReview)

export default router
