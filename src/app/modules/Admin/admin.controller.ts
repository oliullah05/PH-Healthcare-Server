import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.const";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        }
        catch (err) {
            next(err)
        }
    }
}

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {

    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['page', "limit", "sortBy", "sortOrder"]);
    const result = await adminServices.getAllAdmin(filters, options);
    sendResponse(res, {
        success: true,
        message: "Admins are retrieve successfully",
        statusCode: 200,
        meta: result.meta,
        data: result.data
    })

})



const getSingleAdminById: RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await adminServices.getSingleAdminById(id)
    sendResponse(res, {
        success: true,
        message: "Admin is retrieve successfully",
        data: result,
        statusCode: httpStatus.OK
    })
}
)




const updateSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await adminServices.updateSingleAdmin(id, updatedData)
    sendResponse(res, {
        success: true,
        message: "Admin is updated successfully",
        data: result,
        statusCode: httpStatus.OK
    })

})


const deleteSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await adminServices.deleteSingleAdmin(id)
    sendResponse(res, {
        success: true,
        message: "Admin is deleted successfully",
        data: result,
        statusCode: httpStatus.OK
    })
}
)



const softDeleteSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;

    const result = await adminServices.softDeleteSingleAdmin(id)
    res.status(200).json()
    sendResponse(res, {
        success: true,
        message: "Admin is deleted successfully",
        data: result,
        statusCode: httpStatus.OK
    })

})




export const adminControllers = {
    getAllAdmin,
    getSingleAdminById,
    updateSingleAdmin,
    deleteSingleAdmin,
    softDeleteSingleAdmin
}