import express from 'express'
import { getUserProfile, getAllUser } from '../controllers/user.controller.js'

const router = express();

router.get("/profile", getUserProfile)
router.get("/", getAllUser) 

export default router
