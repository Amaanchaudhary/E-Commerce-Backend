import mongoose from 'mongoose';
import connectDb from './config/db.js'
import app from './index.js'

const port = 8000

app.listen(port, async () => {
    try {
        await connectDb();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }
    console.log("app is running on port", port);
});
