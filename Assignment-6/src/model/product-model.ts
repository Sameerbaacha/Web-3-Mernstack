import mongoose, { Schema } from "mongoose";
import IProductType from "../types/product-types";



const productSchema = new Schema<IProductType>(
    {
        title: { type: String, required: true, trim: true, minlength: 3, },
        description: { type: String, trim: true, },
        category: { type: [String], required: true },
        price: { type: Number, required: true, min: 1, },
        quantity: { type: Number, required: true, min: 0, },
        isDeleted: { type: Boolean, default: false, },
    },
    {
        timestamps: true,
    }
)

export const Product = mongoose.model<IProductType>("Product", productSchema)