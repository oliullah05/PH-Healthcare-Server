import { PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../../hepers/fileUploader";
import { IFile } from "../../interface/file";

const createAdmin = async (req: Request) => {
    // console.log({file:req.file,body:req.body.data});
const data = req.body
const file:IFile |undefined = req.file;
// console.log(req.body,"photo");
if(file){
    const uploadToClodinary= await fileUploader.uploadToClodinary(file)

    req.body.admin.profilePhoto =uploadToClodinary?.secure_url;
    // console.log(req.body,"photo");
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

const createDoctor = async (req: Request) => {

const data = req.body
const file:IFile |undefined = req.file;
// console.log(req.body,"photo");
if (!data || !data.doctor) {
    throw new Error('Invalid request data. Doctor details are missing.');
}

if(file){
    const uploadToClodinary= await fileUploader.uploadToClodinary(file)
    console.log({uploadToClodinary});
       req.body.doctor.profilePhoto =uploadToClodinary?.secure_url;

    // console.log(req.body,"photo");
}



    const hashedPassword = await bcrypt.hash(data.password, 12);
    const userData = {
        email: data.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (transactionClient) => {

      
    
        // create user
        await transactionClient.user.create({
            data: userData
        });

        const createDoctor = await transactionClient.doctor.create({
            data: data.doctor
        })

        return createDoctor
    })


    return result;
}




export const userService = {
    createAdmin,
    createDoctor
}