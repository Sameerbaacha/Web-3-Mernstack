import z from "zod";

export const createuserSchema = z.object({
    userName: z.string().min(3),
    email: z.email(),
    role: z.enum(["admin", "user"]).optional(),
    password: z.string().min(8).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character"
    )
})