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

const allowedOrigins = ['https://amaan-ecommerce.netlify.app'];

app.use(cors());
// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//     credentials: true, // If you need to include cookies in the requests
// }));

app.options('*', cors()); // Allow preflight requests globally

app.use(express.json())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to Ecommerce Api", status: true })
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