import { NextFunction,Request,Response } from "express";
export const asyncHandler =
    (requestFunction: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    {
        return (req: Request, res: Response, next: NextFunction) =>
        {
     Promise.resolve(requestFunction(req, res, next)).catch(next);
 }
    
}