import { Prisma, PrismaClient } from "@prisma/client"
import { adminSearchAbleFields } from "./admin.const";

const prisma = new PrismaClient();

const getAllAdmin = async (params: Record<string, any>, options: any) => {
    const { searchTerm, ...filterData } = params;
    const { limit, page } = options
    const andConditions: Prisma.AdminWhereInput[] = [];

    console.log({ filterData });


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
        skip:Number((page-1)*limit),
        take:Number(limit)
    })
    return result
}



export const adminServices = {
    getAllAdmin
}