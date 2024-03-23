import { jwtHelpers } from "../../../hepers/jwtHelpers";
import prisma from "../../../shared/prisma"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
const loginUser = async (payload: { email: string, password: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect")
    }
    const jwtPayload = { email: userData.email, role: userData.role }
    const accessToken = jwtHelpers.genarateToken(jwtPayload, "djhf", "5m")

    const refreshToken = jwtHelpers.genarateToken(jwtPayload, "dghgfhjhf", "30d")
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }

}



const refreshToken = async(token:string)=>{
    let decodedData;
 try{
    decodedData = jwt.verify(token,"dghgfhjhf");

 }
 catch(err){
    throw new Error("You are not authorized")
 }

const userData = await prisma.user.findUniqueOrThrow({
    where:{
        email:decodedData?.email
    }
})


const jwtPayload = { email: userData.email, role: userData.role }
    const accessToken = jwtHelpers.genarateToken(jwtPayload, "djhf", "5m")
    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    }
}

export const AuthServices = {
    loginUser,
    refreshToken
}