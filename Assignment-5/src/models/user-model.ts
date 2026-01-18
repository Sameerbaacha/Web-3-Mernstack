import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, require: true, trim: true },
        email: { type: String, require: true, unique: true, lowercase: true },
        role: { type: String, default: "user" },
        skills: { type: [String], require: true },
        experience: { type: Number, min: 0 },
    },
    { timestamps: true }
)

export default mongoose.model("User", userSchema);