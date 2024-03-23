import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body)
   sendResponse(res,{
    statusCode:httpStatus.OK,
    message:"Logged in successfully",
    success:true,
    data:result
   })
})


export const AuthControllers = {
    loginUser
}