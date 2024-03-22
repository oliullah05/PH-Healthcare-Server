import express, { NextFunction, Request, Response } from "express"
import { adminControllers } from "./admin.controller";
import { AnyZodObject, z } from "zod";

const router = express.Router();


const update = z.object({
    body:z.object({
        name:z.string().optional(),
        contactNumber:z.string().optional()

    })
})


const validateRequest = (schema:AnyZodObject)=>{
 return  async (req:Request,res:Response,next:NextFunction)=>{
    try{
        await schema.parseAsync({
            body:req.body
        })
      return  next()
    }
    catch(err){
        next(err)
    }
    }
}





router.get("/",adminControllers.getAllAdmin)
router.get("/:id",adminControllers.getSingleAdminById)
router.patch("/:id",validateRequest(update),adminControllers.updateSingleAdmin)
router.delete("/:id",adminControllers.deleteSingleAdmin)
router.delete("/soft/:id",adminControllers.softDeleteSingleAdmin)


export const adminRoutes = router;