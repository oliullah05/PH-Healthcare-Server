import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getAllAdmin = async(params:Record<string,any>)=>{

const andConditions:Prisma.AdminWhereInput[] = [];

if(params.searchTerm){
    andConditions.push({
        OR:[
            {
                name:{
                            contains:params.searchTerm,
                            mode:"insensitive"
                        }
            },
            {
                email:{
                    contains:params.searchTerm,
                    mode:"insensitive"
                }
            }
        ]
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