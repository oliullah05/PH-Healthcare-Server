import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { SpecialtiesServices } from "./specialties.service";


const createSpecialties = catchAsync(async (req, res) => {
    const result = await SpecialtiesServices.createSpecialties(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Specialties created successfully",
        success: true,
        data: result
    })
})



export const SpecialtiesControllers = {
    createSpecialties
}