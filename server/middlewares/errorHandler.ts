import { NextFunction } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error.message);
    console.error(error.response?.body);
    next(error);
};
