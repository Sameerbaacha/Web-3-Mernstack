import { Request, Response } from "express";
import { Product } from "../model/product-model";



// ------------------------ Create Product -------------------
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product Created Succesfully",
            data: product,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error",
        })
    }
}

// -------------------- Get all Products --------------------

export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const allproducts = await Product.find({ isDeleted: false });
        res.status(200).json({
            success: true,
            data: allproducts,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error",
        });
    }
}

// -------------------- Get Single Products --------------------

export const getProductById = async (req: Request, res: Response) => {
    try {
        const singleproduct = await Product.findOne({ _id: req.params.id, isDeleted: false });
        if (!singleproduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            data: singleproduct,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error",
        });
    }
};

// -------------------  Update Product ----------------------

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updproduct = await Product.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false }, req.body, { new: true }
        );

        if (!updproduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: updproduct,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error",
        });
    }
};

// ------------------ Delete Product (SOFT DELETE) ----------------
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deleted = await Product.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true }
        );
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully (soft delete)",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error",
        });
    }
}