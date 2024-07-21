import express from "express";
import cors from 'cors'
import authRouters from './routes/auth.routes.js'
import userRouters from './routes/user.routes.js'

const app = express();
app.use(cors());   //here we can define from which domain allow to hit this api's
app.use(express.json())

app.get("/", (req , res) => {
    return res.status(200).send({message : "Welcome to Ecommerce Api", status : true})
})

app.use("/auth", authRouters) 
app.use("/api/users", userRouters) 

export default app;