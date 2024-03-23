import jwt, { JwtPayload, Secret } from "jsonwebtoken"

const genarateToken = (payload:any,secret:string,expiresIn:string)=> {
    const accessToken = jwt.sign(payload, secret, {
        expiresIn,
        algorithm: "HS256"
    })
    return accessToken
}


const verifyToken = async(token:string,secret:string)=>{
  return  jwt.verify(token,secret) as JwtPayload;
}
export const jwtHelpers = {
    genarateToken,
    verifyToken
}
