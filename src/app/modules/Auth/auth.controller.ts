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

const refreshToken = catchAsync(async(req,res)=>{
    const {refreshToken}=req.cookies
    const result = await AuthServices.refreshToken(refreshToken);

   sendResponse(res,{
    statusCode:httpStatus.OK,
    message:"Access token generated successfully",
    success:true,
    data:result
   })
})
const changePassword = catchAsync(async(req,res)=>{
const user = req.user;
    const result = await AuthServices.changePassword(user,req.body);

   sendResponse(res,{
    statusCode:httpStatus.OK,
    message:"Password change successfully",
    success:true,
    data:result
   })
})


export const AuthControllers = {
    loginUser,
    refreshToken,
    changePassword
}