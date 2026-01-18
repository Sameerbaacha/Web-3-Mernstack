import { Request, Response } from "express";
import { usermodal } from "../model/usermodel";


//getalluser
export const getallUSers = async (req: Request, res: Response) => {
    try {
        const users = await usermodal.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            message: "All users",
            data: users
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users" + error.message
        });
    }

}

//getuserbyID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await usermodal.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Invalid user id" + error.message
        });
    }
}

//updateUser
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedUser = await usermodal.findByIdAndUpdate(id, req.body, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated",
            data: updatedUser
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "updation failed" + error.message
        });
    }
}

//deleteuserbyID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await usermodal.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "delete failed" + error.message
        });
    }
}