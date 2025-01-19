import mongoose from 'mongoose';
import connectDb from './config/db.js'
import app from './index.js'

const port = 8000

// app.listen(port, async () => {
//     try {
//         await connectDb();
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.error("Database connection failed", error);
//     }
//     console.log("app is running on port", port);
// });

// Function to start the server
const startServer = async () => {
    try {
        // Attempt to connect to MongoDB
        await connectDb();
        console.log("✅ Database connected successfully");
        
        // Start the Express server
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Call the function to start the server
startServer();