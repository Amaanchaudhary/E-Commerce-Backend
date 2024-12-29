import userModel from "../Models/user.model.js"
import bcrypt from "bcrypt"
import { getUserIdFromToken } from '../config/jwtProvider.js'

export const createUser = async (userData) => {
    try {
        let { firstname, lastname, email, password, mobile } = userData
        const isUserExist = await userModel.findOne({ email })
        if (isUserExist) {
            throw new Error("User Already Exist with email : ", email)
        }
        password = await bcrypt.hash(password, 8);
        const user = await userModel.create({ firstname, lastname, email, password, mobile })
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const findUserById = async (userId) => {
    try {
        const user = await userModel.findById(userId)
            .populate("address")
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
        const userId = getUserIdFromToken(token)
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
