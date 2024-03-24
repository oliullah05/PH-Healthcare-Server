import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../hepers/jwtHelpers";
import config from "../../config";
import ApiError from "../errors/apiErrors";
import httpStatus from "http-status";


const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers.authorization
           if(!accessToken){
            throw new ApiError(httpStatus.UNAUTHORIZED,"you are not authorized")
           }
           const verifyToken =await jwtHelpers.verifyToken(accessToken,config.jwt.jwt_access_secret as string);
           
           if(roles.length && !roles.includes(verifyToken.role)){
            throw new ApiError(httpStatus.FORBIDDEN,"you are FORBIDDEN!!")
           }
           next()
        }
        catch (err) {
            next(err)
        }
    }
}

export default auth;