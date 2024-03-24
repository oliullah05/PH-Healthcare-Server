import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../hepers/jwtHelpers";
import prisma from "../../../shared/prisma";
const loginUser = async (payload: { email: string, password: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status:UserStatus.ACTIVE
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect")
    }
    const jwtPayload = { email: userData.email, role: userData.role }
    const accessToken = jwtHelpers.genarateToken(jwtPayload, config.jwt.jwt_access_secret as string, config.jwt.jwt_access_expaire_in as string)

    const refreshToken = jwtHelpers.genarateToken(jwtPayload, config.jwt.jwt_refresh_secret as string, config.jwt.jwt_refresh_expaire_in as string)
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }

}





const refreshToken = async(refreshToken:string)=>{
    let decodedData;
 try{
    decodedData = jwtHelpers.verifyToken(refreshToken,config.jwt.jwt_refresh_secret as string) as JwtPayload;

 }
 catch(err){  
    throw new Error("You are not authorized")
 }

 const userData = await prisma.user.findFirstOrThrow({
    where: {
        email: decodedData.email,
        status: UserStatus.ACTIVE
    }
});


    const jwtPayload = { email: userData.email, role: userData.role }
    const accessToken = jwtHelpers.genarateToken(jwtPayload, config.jwt.jwt_access_secret as string, config.jwt.jwt_access_expaire_in as string)
    
    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    }
}



const changePassword = async(user,payload:{newPassword:string,oldPassword:string})=>{
const {email}=user;

const userData = await prisma.user.findUniqueOrThrow({
    where:{
        email,
        status:UserStatus.ACTIVE
    }
})

const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect")
    }

    const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

await prisma.user.update({
    where:{
        email:userData.email
    },
    data:{
        password:hashedPassword,
        needPasswordChange:false
    }
})

return {
    message:"Password change successfully"
}
}





export const AuthServices = {
    loginUser,
    refreshToken,
    changePassword
}