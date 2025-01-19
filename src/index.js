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

dotenv.config();
const app = express();


// Allowed origins for CORS
const allowedOrigins = ['https://shoppys-me.vercel.app', 'https://amaan-ecommerce.netlify.app', "http://localhost:3000"];

app.use((req, res, next) => {
    console.log('Request Origin:', req.get('Origin')); // Log incoming origin
    next();
});

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from the specified origins or no origin (for curl requests or mobile apps)
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true); // Allow the request
        }
        return callback(new Error('CORS policy does not allow access from this origin'), false); // Reject the request
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the methods you need
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow headers you need
    credentials: true  // Allow cookies and credentials if needed
}));

app.options('', cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the methods you need
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow headers you need
    credentials: true  // Allow cookies and credentials if needed
})); // Allow preflight requests globally


app.use(express.json())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to Api v2", status: true })
})

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

export default app;