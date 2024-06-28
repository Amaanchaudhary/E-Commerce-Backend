import userModel from "../Models/user.model"
import bcrypt from "bcrypt"
import jwtProvider from '../config/jwtProvider.js'

export const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData
        const isUserExist = await userModel.findOne({ email })
        if (isUserExist) {
            throw new Error("User Already Exist with email : ", email)
        }
        password = await bcrypt.hash(password, 8);
        const user = await userModel.create({ firstName, lastName, email, password })
        console.log("Created user :", user);
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const findUserById = async (userId) => {
    try {
        const user = await userModel.findById(userId).populate("address")
        if (!user) {
            throw new Error("User not found with Id : ", userId)
        }
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error("User not found with email : ", email)
        }
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token)
        const user = await findUserById(userId)

        if (!user) {
            throw new Error("User not found with id : ", userId)
        }

        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAllUsers = async (token) => {
    try {
        const users = await userModel.find()
        return users;

    } catch (error) {
        throw new Error(error.message)
    }
}

