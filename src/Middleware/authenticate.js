import jwt from 'jsonwebtoken'
import { getUserIdFromToken } from '../config/jwtProvider.js'
import { findUserById } from '../services/user.service.js'

export const authenticate = async (req, res, next) => {    
    
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(404).send({ error: "token not found.." })
        }

        const userId = await getUserIdFromToken(token)
        const user = await findUserById(userId)
        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }
        // console.log("Authenticated user:", user);
        req.user = user
        next();
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}