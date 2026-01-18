import { z } from "zod";

export const createProductSchema = z.object({
    title: z.string().min(1, "Title is required").min(3, "Title must be at least 3 characters"),

    description: z.string().optional(),

    price: z.coerce.number().positive("Price must be greater than 0"),

    quantity: z.coerce.number().min(0, "Quantity cannot be negative"),

    category: z.array(z.string()).min(1, "At least one category is required"),
});

export const updateProductSchema = createProductSchema.partial();

export const createProductParamSchema = z.object({
    id: z.string().min(24, "Invalid Product Id").max(24, "Invalid Product Id"),
});