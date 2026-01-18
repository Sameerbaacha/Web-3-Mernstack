import { Router } from "express";
import { authmiddleware } from "../middleware/auth-middleware";
import { adminOnly } from "../middleware/role.middleware";
import { deleteUser, getallUSers, getUserById, updateUser } from "../controller/user-controller";


const router = Router();

router.get("/", authmiddleware, adminOnly, getallUSers);
router.get("/:id", authmiddleware, adminOnly, getUserById);
router.put("/:id", authmiddleware, adminOnly, updateUser);
router.delete("/:id", authmiddleware, adminOnly, deleteUser);

export default router;
