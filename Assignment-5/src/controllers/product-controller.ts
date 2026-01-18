import { Request, Response } from "express";
import productModel from "../models/product-model";



interface ProductBody {
    name: string;
    price: number;
    description: string;
    category: string;
    stock?: number;
}

// create Product //
export async function createProduct(req: Request<{}, {}, ProductBody>, res: Response) {
    try {
        const { name, price, description, category, stock } = req.body;
        //validation 
        if (!name || !price || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const product = new productModel(req.body)
        const savedProduct = await product.save()
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: savedProduct
        });


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server error " + error.message,
        });
    }
};


//get all product

export async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await productModel.find();

        res.status(200).json({
            success: true,
            message: "All Product Recieved",
            data: products,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// get product by id 
export async function getProductById(req: Request<{ id: string }>, res: Response) {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//update product by id //
export async function updateProductById(req: Request<{ id: string }, {}, Partial<ProductBody>>, res: Response) {
    try {
        const { id } = req.params;
        const updateProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: updateProduct
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// delete product //

export async function deleteProductById(req: Request<{ id: string }>, res: Response) {
    try {
        const { id } = req.params;
        const deleted = await productModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}