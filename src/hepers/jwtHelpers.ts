import jwt from "jsonwebtoken"

const genarateToken = (payload:any,secret:string,expiresIn:string)=> {
    const accessToken = jwt.sign(payload, secret, {
        expiresIn,
        algorithm: "HS256"
    })
    return accessToken
}

export const jwtHelpers = {
    genarateToken
}
