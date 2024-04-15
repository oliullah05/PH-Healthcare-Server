import { Doctor } from "@prisma/client";
import prisma from "../../../shared/prisma";

const updateDoctor = async(id:string,payload:Doctor)=>{
const doctorData = await prisma.doctor.findUniqueOrThrow({
    where:{
        id
    }
})

const updateDoctorData = prisma.doctor.update({
    where:{
        id
    },
    data:payload
})

return updateDoctorData
}


export const DoctorServices = {
    updateDoctor
}