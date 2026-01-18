import { Document } from "mongoose";

export default interface IProductType extends Document {
    title: string;
    description?: string;
    price: number;
    quantity: number;
    category: string[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
