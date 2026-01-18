import { Request, Response, NextFunction } from "express";
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Method is ${req.method} Url is ${req.url} at time ${new Date().toLocaleString()}`);
    next();
};

export default logger;