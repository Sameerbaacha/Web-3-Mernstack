import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/database";
import productRoutes from "./routes/product-routes";
import logger from "./middlewares/logger";

dotenv.config();
connectDb();

const app = express();
app.use(express.json(),logger);


app.use("/api/products", productRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
