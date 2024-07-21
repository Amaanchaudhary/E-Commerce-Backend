import jwt from 'jsonwebtoken'

const SECRET_KEY = "Amaan_Chaudhary_118"

export const generateToken = async (userId) => {
    // console.log(userId, "userID");
    const token = jwt.sign({userId}, SECRET_KEY, {expiresIn : "48h"})
    // console.log(token , "token");
    return token
}

export const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, SECRET_KEY)
    return decodedToken.userId 
}





