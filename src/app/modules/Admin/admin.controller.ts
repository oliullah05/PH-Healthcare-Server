import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
 
    try {
        const result = await adminServices.getAllAdmin(req.query);
        res.status(200).json({
            success: true,
            message: "Admins are retrieve successfully",
            data: result
        })
    }
    catch (err:any) {
        res.status(500).json({
            success:false,
            message:err.name  || "Something went wrong",
            error:err
           })
    }
}


export const adminControllers = {
    getAllAdmin
}