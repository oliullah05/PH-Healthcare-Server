import { Prisma, PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../../hepers/fileUploader";
import { IFile } from "../../interface/file";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../../hepers/paginationHelpers";
import { userSearchableFields } from "./user.const";

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







const getAllUser = async (params:any, options:IPaginationOptions) => {
 
    const { searchTerm, ...filterData } = params;
 
    const { limit, page, sortBy, sortOrder, skip } = paginationHelper.calculatePagination(options)
    const andConditions: Prisma.UserWhereInput[] = [];


    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
                [field]: {
                    contains:searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }


    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }




    // andConditions.push({
    //     isDeleted:false
    // })
console.log(andConditions);
    const whereConditions: Prisma.UserWhereInput = { AND: andConditions }
    // console.dir(andConditions,{depth:"infinity"});
    const result = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        },
        select:{
           id:true,
           email:true,
           needPasswordChange:true,
           status:true,
           role:true,
           createdAt:true,
           updatedAt:true,
           admin:true,
           Doctor:true
        }
    })

    const total = await prisma.user.count({
        where: whereConditions
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}






















export const userService = {
    createAdmin,
    createDoctor,
    getAllUser
}