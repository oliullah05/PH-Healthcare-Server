import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorServices } from "./doctor.service";

const updateDoctor = catchAsync(async(req,res)=>{
        const {id}= req.params
        const user = req.user;
        const result = await DoctorServices.updateDoctor(id, req.body);
    


        sendResponse(res, {
            statusCode: httpStatus.OK,
            message: "Doctor updated successfully",
            success: true,
            data: result
        })
    })



    export const DoctorControllers = {
        updateDoctor
    }