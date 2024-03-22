import express, { NextFunction, Request, Response } from "express"
import { adminControllers } from "./admin.controller";

const router = express.Router();


const validateRequest = (req:Request,res:Response,next:NextFunction)=>{
    console.log("middlewars",req.body);
    next()
}





router.get("/",adminControllers.getAllAdmin)
router.get("/:id",adminControllers.getSingleAdminById)
router.patch("/:id",validateRequest,adminControllers.updateSingleAdmin)
router.delete("/:id",adminControllers.deleteSingleAdmin)
router.delete("/soft/:id",adminControllers.softDeleteSingleAdmin)


export const adminRoutes = router;