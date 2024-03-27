import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.const";
import sendResponse from "../../../shared/sendResponse";

const createAdmin = async(req:Request,res:Response)=>{

        const result = await userService.createAdmin(req);
        res.status(200).json({
            success:true,
            message:"Admin created successfully",
            data:result
        })
    
}


const createDoctor = async(req:Request,res:Response)=>{
 
        const result = await userService.createDoctor(req);
        res.status(200).json({
            success:true,
            message:"Doctor created successfully",
            data:result
        })
    
}

const getAllUser = catchAsync(async (req, res) => {

    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ['page', "limit", "sortBy", "sortOrder"]);
    const result = await userService.getAllUser(filters, options);
    sendResponse(res, {
        success: true,
        message: "Users are retrieve successfully",
        statusCode: 200,
        meta: result.meta,
        data: result.data
    })

})




export const userController = {
    createAdmin,
    createDoctor,
    getAllUser}