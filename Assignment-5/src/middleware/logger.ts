import { NextFunction, Request, Response } from "express";


function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Url is ${req.url}, Method is ${req.method} at Time ${new Date().toLocaleString()}`);
    next();
}
export default logger;