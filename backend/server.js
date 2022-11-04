import express, {json} from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {connectRedis} from "./config/redis.js";
import cors from "./middleware/corsMiddleware.js";
import colors from "colors";
import morgan from "morgan";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();
connectRedis();

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors)

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    console.log("PRODUCTION".red.bold)
} else {
    // In development
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));