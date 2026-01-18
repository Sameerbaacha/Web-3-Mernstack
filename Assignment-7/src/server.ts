import express from "express";
import { connectDb } from "./db/db";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user-route";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());

connectDb();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});