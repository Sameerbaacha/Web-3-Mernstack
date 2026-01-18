import { Request, Response } from "express";
import { createuserSchema, loginSchema } from "../validators/validator-zod";
import { usermodal } from "../model/usermodel";
import { comparedPassword, hashing } from "../utils/password";
import { generateJWT } from "../utils/jwt";


//register

export async function createUser(req: Request, res: Response) {
    try {
        const { success, error, data } = createuserSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message
            })
        }

        const isFound = await usermodal.findOne({ email: data.email });
        if (isFound) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email!",
            })
        }

        const hashedPassword = await hashing(data.password);
        const user = new usermodal({
            userName: data.userName,
            email: data.email,
            role: data.role,
            password: hashedPassword
        });

        const newUSer = await user.save();

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: newUSer
        })
    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        });
    }
}


//login

export async function loginUser(req: Request, res: Response) {
    try {
        const { success, error, data } = loginSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message
            })
        }

        const user = await usermodal.findOne({ email: data.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            }
            )
        }

        const isMatch = await comparedPassword(data.password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = generateJWT({
            id: user._id.toString(),
            role: user.role,
        })

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accesstoken: token,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message,
        });
    }
}
