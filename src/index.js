import express from "express";
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

app.get("/", (req , res) => {
    return res.status(200).send({message : "Welcome to Ecommerce Api", status : true})
})

export default app;