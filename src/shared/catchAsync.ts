import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
    return async (req: Request & {user:any}, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        }
        catch (err) {
            next(err)
        }
    }
}

export default catchAsync;