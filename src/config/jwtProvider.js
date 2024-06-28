import jwt from 'jsonwebtoken'

const SECRET_KEY = "Amaan_Chaudhary_118"

export const generateToken = async (userId) => {
    const token = jwt.sign({userId}, SECRET_KEY, {expiryIn : "48h"})
    return token
}

export const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, SECRET_KEY)
    return decodedToken.userId 
}




