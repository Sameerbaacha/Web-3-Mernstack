import { Router } from "express"
import { validate } from "../middlewares/validate-zod";
import { createProductParamSchema, createProductSchema, updateProductSchema } from "../validators/product-validator-zod";
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../controller/product-controller";







const router = Router();


router.post("/", validate(createProductSchema, "body"), createProduct);

router.get("/", getAllProduct);

router.get("/:id", validate(createProductParamSchema, "params"), getProductById);

router.put("/:id", validate(createProductParamSchema, "params"), validate(updateProductSchema, "body"), updateProduct);

router.delete("/:id",validate(createProductParamSchema, "params"),deleteProduct);

export default router;