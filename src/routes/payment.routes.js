import express from 'express'
import { authenticate } from '../Middleware/authenticate.js';
import { CreatePaymentLink, UpdatePaymentInfo } from '../controllers/payment.controller.js';

const router = express();

router.post("/:id", authenticate, CreatePaymentLink)
router.get("/", authenticate, UpdatePaymentInfo)

export default router 