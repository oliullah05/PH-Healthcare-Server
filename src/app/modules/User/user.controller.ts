import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async(req:Request,res:Response)=>{
 console.log("object");
 try{
        const result = await userService.createAdmin(req.body);
        res.status(200).json({
            success:true,
            message:"admin created successfully",
            data:result
        })
    }

    catch(err:any){
       res.status(500).json({
        success:false,
        message:err.name  || "Something went wrong",
        error:err
       })
    }
}

export const userController = {
    createAdmin
}