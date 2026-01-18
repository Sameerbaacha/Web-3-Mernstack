import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("MOngoDb Connected Successfully");
    } catch (error: any) {
        console.log("Db connection failed", error.message)
    }
}