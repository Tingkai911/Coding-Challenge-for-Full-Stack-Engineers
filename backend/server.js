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
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

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
app.use("/api/upload", uploadRoutes);

// Make the uploads folder a static folder to upload our images
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
    // Make the build folder a static folder
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    // Any routes that is not any of the above will come here and load our index.html
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
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