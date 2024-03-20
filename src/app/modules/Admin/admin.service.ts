import { Prisma, PrismaClient } from "@prisma/client"
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
        where:whereConditions
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data:result
    }
}



export const adminServices = {
    getAllAdmin
}