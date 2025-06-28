import 'dotenv/config'
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true
}))

// db connection
connectDB();

// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads')) // images in 'uploads' folder are mounted to this endpoint
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
