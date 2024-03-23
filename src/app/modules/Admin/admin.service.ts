import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client"
import { adminSearchAbleFields } from "./admin.const";
import { paginationHelper } from "../../../hepers/paginationHelpers";
import prisma from "../../../shared/prisma";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interface/pagination";




const getAllAdmin = async (params: IAdminFilterRequest, options:IPaginationOptions) => {

    const { searchTerm, ...filterData } = params;
    const { limit, page, sortBy, sortOrder, skip } = paginationHelper.calculatePagination(options)
    const andConditions: Prisma.AdminWhereInput[] = [];


    if (params.searchTerm) {
        andConditions.push({
            OR: adminSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
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




    andConditions.push({
        isDeleted:false
    })

    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }
    // console.dir(andConditions,{depth:"infinity"});
    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        }
    })

    const total = await prisma.admin.count({
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




const getSingleAdminById = async (id: string):Promise<Admin | null> => {
    const result = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted:false
        }
    })
    return result
}

const updateSingleAdmin = async (id: string, updatedData: Partial<Admin>):Promise<Admin|null> => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,isDeleted:false
        }
    })

    const result = await prisma.admin.update({
        where: {
            id
        },
        data: updatedData
    })
    return result
}


const deleteSingleAdmin = async (id: string):Promise<Admin | null>  => {

    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.$transaction(async (transactionClient) => {
        const adminDeletedData = await transactionClient.admin.delete({
            where: {
                id
            }
        })

        const userDeletedData = await transactionClient.user.delete({
            where: {
                email: adminDeletedData.email
            }
        })

        return adminDeletedData

    })
    return result
}




const softDeleteSingleAdmin = async (id: string) :Promise<Admin | null> => {

    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted:false
        }
    })

    const result = await prisma.$transaction(async (transactionClient) => {
        const adminDeletedData = await transactionClient.admin.update({
            where: {
                id
            },
            data:{
                isDeleted:true
            }
        })

        const userDeletedData = await transactionClient.user.update({
            where: {
                email: adminDeletedData.email
            },
            data:{
                status:UserStatus.DELETED
            }
        })

        return adminDeletedData

    })
    return result
}



export const adminServices = {
    getAllAdmin,
    getSingleAdminById,
    updateSingleAdmin,
    deleteSingleAdmin,
    softDeleteSingleAdmin
}