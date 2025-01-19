import express from "express";
import cors from 'cors'
import authRouters from './routes/auth.routes.js'
import userRouters from './routes/user.routes.js'
import productRouters from './routes/product.routes.js'
import adminProductRouters from './routes/adminProduct.routes.js'
import cartRouters from './routes/cart.routes.js'
import cartItemRouters from './routes/cartItem.routes.js'
import orderRouters from './routes/order.routes.js'
import reviewRouters from './routes/review.routes.js'
import ratingRouters from './routes/rating.routes.js'
import adminRouters from './routes/admin.routes.js'
import paymentRouters from './routes/payment.routes.js'
import dotenv from 'dotenv'
import connectDb from "./config/db.js";

dotenv.config();
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
    "https://shoppys-me.vercel.app",
    "https://shoppys-chvvgc9by-amaan-chaudharys-projects.vercel.app",
    "https://amaan-ecommerce.netlify.app",
    "http://localhost:3000",
  ];

// Middleware to log request origins (optional for production)
app.use((req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Request Origin:", req.get("Origin"));
    }
    next();
  });

// CORS setup
app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error("CORS policy does not allow access from this origin"), false);
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

// JSON body parser
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to Api v8", status: true });
  });
app.use("/auth", authRouters)
app.use("/api/users", userRouters)
app.use("/api/products", productRouters)
app.use("/api/admin/products", adminProductRouters)
app.use("/api/cart", cartRouters)
app.use("/api/cart_items", cartItemRouters)
app.use("/api/orders", orderRouters)
app.use("/api/reviews", reviewRouters)
app.use("/api/ratings", ratingRouters)
app.use("/api/admin/orders", adminRouters)
app.use("/api/payments", paymentRouters)

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message);
    res.status(500).send({ error: "An unexpected error occurred" });
  });

export default app;