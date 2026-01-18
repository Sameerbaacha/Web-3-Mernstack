import { Router } from "express";
import { createuser, deleteUSer, getAllUsers, getbyid, updateUser,  } from "../controllers/user-controller";



const router = Router();

router.post("/createuser", createuser);
router.get("/getalluser", getAllUsers);
router.get("/user/:id", getbyid);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUSer)

export default router;