import userService from '../services/user.service.js'

export const getUserProfile = async (req, res) => {
    try {
        const jwt = req.header.authorization?.split(" ")[1]
        if (!jwt) {
            return res.status(404).send({ message: "token not found" })
        }

        const user = await userService.getUserProfileByToken(jwt)

        return res.status(200).send(user)
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
}


export const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        return res.status(200).send(users);
    } catch (error) {
        return res.send(500).send({ error: error.message })
    }
}