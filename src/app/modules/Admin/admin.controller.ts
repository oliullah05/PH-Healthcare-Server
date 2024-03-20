import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import  pick  from "../../../shared/pick";
import { adminFilterableFields } from "./admin.const";






const getAllAdmin = async (req: Request, res: Response) => {
 const filters = pick(req.query,adminFilterableFields);
 const options = pick(req.query,['page',"limit","sortBy","sortOrder"]);
    try {
        const result = await adminServices.getAllAdmin(filters,options);
        res.status(200).json({
            success: true,
            message: "Admins are retrieve successfully",
            meta:result.meta,
            data: result.data
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