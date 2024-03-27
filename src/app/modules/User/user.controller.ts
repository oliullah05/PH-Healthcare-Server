import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async(req:Request,res:Response)=>{

        const result = await userService.createAdmin(req);
        res.status(200).json({
            success:true,
            message:"Admin created successfully",
            data:result
        })
    
}


const createDoctor = async(req:Request,res:Response)=>{
    console.log({file:req.file,body:req.body.data});
        const result = await userService.createDoctor(req);
        res.status(200).json({
            success:true,
            message:"Doctor created successfully",
            data:result
        })
    
}

export const userController = {
    createAdmin,
    createDoctor
}