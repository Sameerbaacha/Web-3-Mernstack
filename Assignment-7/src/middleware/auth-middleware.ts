import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";


export const authmiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token" });

        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();


    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        });
    }
}