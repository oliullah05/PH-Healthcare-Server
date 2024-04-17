import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ScheduleServices } from "./schedule.service";


const createSpecialties = catchAsync(async (req, res) => {
    const result = await ScheduleServices.insertIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Schedule created successfully",
        success: true,
        data: result
    })
})



export const ScheduleControllers = {
    createSpecialties
}