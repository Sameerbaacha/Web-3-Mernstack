import mongoose, { Schema } from "mongoose";
import { Iusertype } from "../types/user-types";




const userschema = new Schema<Iusertype>(
    {
        userName: { type: String, required: true, trim: true, minlength: 3, },
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        contact: { type: Number },
        password: { type: String, required: true, minLength: 8 }
    },
    {
        timestamps: true,
    }
)

export const usermodal = mongoose.model<Iusertype>('User', userschema)