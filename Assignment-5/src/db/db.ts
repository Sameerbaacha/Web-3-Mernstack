import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected");
    } catch (error:any) {
        console.log("DB connection failed " + error.message);
        process.exit(1);
    }
}