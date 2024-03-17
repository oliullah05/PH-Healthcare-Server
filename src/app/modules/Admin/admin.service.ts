import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getAllAdmin = async(params:Record<string,any>)=>{
const andConditions:Prisma.AdminWhereInput[] = [];

const adminSearchAbleFields = ["name","email"]







if(params.searchTerm){
    andConditions.push({
        OR:adminSearchAbleFields.map(field=>({
            [field]:{
                        contains:params.searchTerm,
                        mode:"insensitive"
                    }
        }))
    })
}

const whereConditions:Prisma.AdminWhereInput = {AND:andConditions}


console.dir(andConditions,{depth:"infinity"});
const result = await prisma.admin.findMany({


    where:whereConditions
})
return result
}



export const adminServices = {
    getAllAdmin
}