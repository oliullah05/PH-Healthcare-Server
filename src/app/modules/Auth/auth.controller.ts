import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body);
    const {refreshToken} = result;

res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:false
})
   sendResponse(res,{
    statusCode:httpStatus.OK,
    message:"Logged in successfully",
    success:true,
    data:{
        accessToken:result.accessToken,
        needPasswordChange:result.needPasswordChange
    }
   })
})


export const AuthControllers = {
    loginUser
}