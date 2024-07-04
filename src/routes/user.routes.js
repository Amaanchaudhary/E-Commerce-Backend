import { Router } from 'express'
import { register, login } from '../controllers/auth.controller.js'
import { getUserProfile, getAllUser } from '../controllers/user.controller.js'

const router = Router();

router.get("/profile", getUserProfile)
router.post("/", getAllUser)


export default router
