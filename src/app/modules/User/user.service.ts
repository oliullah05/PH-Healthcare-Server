import { PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../../hepers/fileUploader";

const createAdmin = async (req: Request) => {
    // console.log({file:req.file,body:req.body.data});
const data = req.body
const file = req.file;
// console.log(req.body,"photo");
if(file){
    const uploadToClodinary:any = await fileUploader.uploadToClodinary(file)
    // console.log({uploadToClodinary});
    req.body.admin.profilePhoto =uploadToClodinary?.secure_url;
    console.log(req.body,"photo");
}



    const hashedPassword = await bcrypt.hash(data.password, 12);
    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {

      
        
          

        // create user
        await transactionClient.user.create({
            data: userData
        });

        const createAdmin = await transactionClient.admin.create({
            data: data.admin
        })

        return createAdmin
    })


    return result;
}

export const userService = {
    createAdmin
}