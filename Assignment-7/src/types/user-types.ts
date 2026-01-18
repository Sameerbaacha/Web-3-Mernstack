import { Document } from "mongoose";

export interface Iusertype extends Document {
    userName: string;
    email: string;
    contact: number,
    password: string;
    role: "admin" | "user";
}