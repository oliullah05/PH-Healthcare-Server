import { jwtHelpers } from "../../../hepers/jwtHelpers";
import prisma from "../../../shared/prisma"
import bcrypt from "bcrypt"

const loginUser = async (payload: { email: string, password: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);
if(!isCorrectPassword){
    throw new Error("Password incorrect")
}

const jwtPayload = { email: userData.email, role: userData.role }

    const accessToken = jwtHelpers.genarateToken(jwtPayload,"djhf","5m")

    // refresh token


const refreshToken = jwtHelpers.genarateToken(jwtPayload,"dghgfhjhf","30d")



    return {

        accessToken,
        refreshToken,
        needPasswordChange:userData.needPasswordChange

    }



}


export const AuthServices = {
    loginUser
}