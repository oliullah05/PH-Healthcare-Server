import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client"
import { adminSearchAbleFields } from "./admin.const";
import { paginationHelper } from "../../../hepers/paginationHelpers";
import prisma from "../../../shared/prisma";




const getAllAdmin = async (params: Record<string, any>, options: any) => {
    const { searchTerm, ...filterData } = params;
    const { limit, page, sortBy, sortOrder, skip } = paginationHelper.calculatePagination(options)
    const andConditions: Prisma.AdminWhereInput[] = [];

    console.log({ options });


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
                    equals: filterData[key]
                }
            }))
        })
    }


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




const getSingleAdminById = async (id: string) => {
    const result = await prisma.admin.findUnique({
        where: {
            id
        }
    })
    return result
}

const updateSingleAdmin = async (id: string, updatedData: Partial<Admin>) => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id
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


const deleteSingleAdmin = async (id: string) => {

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




const softDeleteSingleAdmin = async (id: string) => {

    await prisma.admin.findUniqueOrThrow({
        where: {
            id
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