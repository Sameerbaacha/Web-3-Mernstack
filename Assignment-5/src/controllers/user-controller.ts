import { Request, Response } from "express";
import userModel from "../models/user-model";

interface Reqbody {
    userName: string,
    email: string,
    role?: string,
    skills: string[];
    experience: number;
}

/////////////   Create User    /////////////

export async function createuser(req: Request<{}, {}, Reqbody>, res: Response) {
    try {
        const { userName, email, skills, experience } = req.body

        //   for validation  
        if (!userName || !email || skills.length === 0) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        // for duplicate email
        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }
        // for Save  a user
        const user = new userModel(req.body)
        const savedUser = await user.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: savedUser
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`,
        });
    }
}

/////////////   GET ALL USERS    /////////////
export async function getAllUsers(req: Request, res: Response) {
    try {
        const allusers = await userModel.find();
        res.status(200).json({
            success: true,
            message: "Users fetch Successfully",
            data: allusers
        });

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

/////////////   GET USER BY ID    /////////////

export async function getbyid(req: Request<{ id: string }>, res: Response) {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

/////////////  Update USER BY ID    /////////////   

export async function updateUser(req: Request<{ id: string }>, res: Response) {
    try {
        const { id } = req.params
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        };
        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/////////////  Delete USER BY ID    /////////////   
export async function deleteUSer(req: Request<{ id: string }>, res: Response) {
    try {
        const { id } = req.params
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, message: "User deleted successfully", data: deletedUser });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}