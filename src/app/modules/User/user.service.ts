import { Prisma, PrismaClient, User, UserRole, UserStatus } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../../hepers/fileUploader";
import { IFile } from "../../interface/file";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../../hepers/paginationHelpers";
import { userSearchableFields } from "./user.const";
import { JwtHeader, JwtPayload } from "jsonwebtoken";

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

const changeProfileStatus = async(id:string,data:UserRole)=>{
 await prisma.user.findUniqueOrThrow({
    where:{
        id
    }
})

const updateUserStatus = await prisma.user.update({
    where:{
        id
    },
    data
})

return updateUserStatus
}


const getMyProfile = async(user:JwtPayload)=>{
const userData = await prisma.user.findUniqueOrThrow({
    where:{
        email:user.email,
        status:UserStatus.ACTIVE
    },
    select:{
        id:true,
        email:true,
        status:true,
        role:true,
        needPasswordChange:true,
        password:false,
    }
})

let profileInfo;

if(userData.role===UserRole.SUPER_ADMIN){
    profileInfo = await prisma.admin.findUnique({
        where:{
            email:userData.email
        }
    })
}

else if(userData.role===UserRole.ADMIN){
    profileInfo = await prisma.admin.findUnique({
        where:{
            email:userData.email
        }
    })
}


else if(userData.role===UserRole.DOCTOR){
    profileInfo = await prisma.doctor.findUnique({
        where:{
            email:userData.email
        }
    })
}

else if(userData.role===UserRole.PATIENT){
    profileInfo = await prisma.user.findUnique({
        where:{
            email:userData.email
        }
    })
}

return  {...userData,...profileInfo};
}





const updateMyProfile = async(user:JwtPayload,req:Request)=>{
   const updatedDate = req.body;


    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email:user.email,
            status:UserStatus.ACTIVE
        }
    })
    

const file = req.file as IFile
if(file){
    const uploadToClodinary = await fileUploader.uploadToClodinary(file);
    req.body.profilePhoto = uploadToClodinary?.secure_url;
}



    let profileInfo;
    
    if(userData.role===UserRole.SUPER_ADMIN){
        profileInfo = await prisma.admin.update({
            where:{
                email:userData.email
            },
            data:updatedDate
        })
    }
    
    else if(userData.role===UserRole.ADMIN){
        profileInfo = await prisma.admin.update({
            where:{
                email:userData.email
            },
            data:updatedDate
        })
    }
    
    
    else if(userData.role===UserRole.DOCTOR){
        profileInfo = await prisma.doctor.update({
            where:{
                email:userData.email
            },
            data:updatedDate
        })
    }
    
    else if(userData.role===UserRole.PATIENT){
        profileInfo = await prisma.user.findUnique({
            where:{
                email:userData.email
            }
        })
    }
    
    return  profileInfo;
    }




export const userService = {
    createAdmin,
    createDoctor,
    getAllUser,
    changeProfileStatus,
    getMyProfile,
    updateMyProfile
}