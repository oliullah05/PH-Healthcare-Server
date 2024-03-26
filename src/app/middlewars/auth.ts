import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../hepers/jwtHelpers";
import config from "../../config";

import httpStatus from "http-status";
import ApiError from "../errors/ApiErrors";


const auth = (...roles: string[]) => {
    return async (req: Request & {user?:any}, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers.authorization
           if(!accessToken){
            throw new ApiError(httpStatus.UNAUTHORIZED,"you are not authorized")
           }
           const verifyUser =await jwtHelpers.verifyToken(accessToken,config.jwt.jwt_access_secret as string);
           req.user= verifyUser
           if(roles.length && !roles.includes(verifyUser.role)){
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