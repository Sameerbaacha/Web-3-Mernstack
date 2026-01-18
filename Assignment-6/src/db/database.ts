import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("✅ Mongodb Connected Successfully")
    } catch (error: any) {
        console.error("❌ DB connection failed", error.message);
        process.exit(1);
    }
}