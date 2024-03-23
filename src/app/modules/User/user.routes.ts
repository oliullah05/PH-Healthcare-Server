import express, { NextFunction, Request, Response } from "express"
import { userController } from "./user.controller";
import { jwtHelpers } from "../../../hepers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const router = express.Router();
const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers.authorization
           if(!accessToken){
            throw new Error("you are not authorized")
           }
           const verifyToken =await jwtHelpers.verifyToken(accessToken,config.jwt.jwt_access_secret as string);
           
           if(roles.length && !roles.includes(verifyToken.role)){
            throw new Error("you are not authorized")
           }
           next()
        }
        catch (err) {
            next(err)
        }
    }
}
router.post("/", auth("ADMIN", "SUPER_ADMIN"), userController.createAdmin)

export const userRoutes = router;


