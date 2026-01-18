import { Router } from "express";
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../controllers/product-controller";



const router = Router();

router.post("/createproduct", createProduct);
router.get("/getallproduct", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/updateproduct/:id", updateProductById);
router.delete("/deleteproduct/:id", deleteProductById);


export default router;