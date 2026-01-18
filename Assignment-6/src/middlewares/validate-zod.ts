import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

export const validate =
    (schema: ZodObject<ZodRawShape>, property: "body" | "params" = "body") =>
        (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req[property])
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    errors: result.error.issues[0].message,
                })
            }
            // replace prevoius object with new data
            req[property] = result.data;
            next();
        }

