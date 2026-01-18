import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/db";
import userRoutes from "./routes/user-routes";
import productRoutes from "./routes/product-routes";
import logger from "./middleware/logger";

dotenv.config();

const app = express();
app.use(express.json(), logger);

connectDb();

app.use("/api/", userRoutes);
app.use("/api/", productRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running");
});