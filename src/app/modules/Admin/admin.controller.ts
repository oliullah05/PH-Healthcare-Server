import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.service";
import  pick  from "../../../shared/pick";
import { adminFilterableFields } from "./admin.const";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";



const getAllAdmin = async (req: Request, res: Response,next:NextFunction) => {
 const filters = pick(req.query,adminFilterableFields);
 const options = pick(req.query,['page',"limit","sortBy","sortOrder"]);
    try {
        const result = await adminServices.getAllAdmin(filters,options);
        // res.status(200).json({
        //     success: true,
        //     message: "Admins are retrieve successfully",
        //     meta:result.meta,
        //     data: result.data
        // })
        sendResponse(res,{
            success:true,
            message: "Admins are retrieve successfully",
            statusCode:200,
            meta:result.meta,
            data: result.data
        })
    }
    catch (err:any) {
       next(err)
    }
}



const getSingleAdminById = async (req: Request, res: Response,next:NextFunction) => {
    const id = req.params.id
    try {
           const result = await adminServices.getSingleAdminById(id)
           sendResponse(res,{
            success: true,
            message: "Admin is retrieve successfully",
            data: result,
            statusCode:httpStatus.OK
        })
       }
       catch (err:any) {
        next(err)
       }
   }
   




   const updateSingleAdmin = async(req: Request, res: Response,next:NextFunction)=>{
    const id = req.params.id;
    const updatedData = req.body;
    try {
           const result = await adminServices.updateSingleAdmin(id,updatedData)
           sendResponse(res,{
            success: true,
            message: "Admin is updated successfully",
            data: result,
            statusCode:httpStatus.OK
        })
       }
       catch (err:any) {
        next(err)
       }
   }


   const deleteSingleAdmin= async(req: Request, res: Response,next:NextFunction)=>{
    const id = req.params.id;
       try {
        const result = await adminServices.deleteSingleAdmin(id)

           sendResponse(res,{
            success: true,
            message: "Admin is deleted successfully",
            data: result,
            statusCode:httpStatus.OK
        })
       }
       catch (err:any) {
        next(err)
       }
   }




   const softDeleteSingleAdmin= async(req: Request, res: Response,next:NextFunction)=>{
    const id = req.params.id;
   
    
       try {
        const result = await adminServices.softDeleteSingleAdmin(id)
           res.status(200).json()
           sendResponse(res,{
            success: true,
            message: "Admin is deleted successfully",
            data: result,
            statusCode:httpStatus.OK
        })
       }
       catch (err:any) {
         next(err)
       }
   }




export const adminControllers = {
    getAllAdmin,
    getSingleAdminById,
    updateSingleAdmin,
    deleteSingleAdmin,
    softDeleteSingleAdmin
}