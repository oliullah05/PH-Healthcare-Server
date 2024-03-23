import prisma from "../../../shared/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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


    const accessToken = jwt.sign({ email: userData.email, role: userData.role }, "secretKRy", {
        expiresIn: "5m",
        algorithm: "HS256"
    })

    // refresh token


const refreshToken = jwt.sign({ email: userData.email, role: userData.role }, "secretKRydfsdf", {
    expiresIn: "30d",
    algorithm: "HS256"
})



    return {

        accessToken,
        refreshToken,
        needPasswordChange:userData.needPasswordChange

    }



}


export const AuthServices = {
    loginUser
}