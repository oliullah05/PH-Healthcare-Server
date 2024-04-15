import { Doctor } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { date } from "zod";

const updateDoctor = async(id:string,payload:Doctor & {specialties:string[]})=>{
const {specialties,...doctorData} = payload
const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where:{
        id
    }
})


const result = await prisma.$transaction(async(transactionClient)=>{

    const updateDoctorData = transactionClient.doctor.update({
        where:{
            id
        },
        data:doctorData
    })


const doctorSpecialities= specialties.map((specialties)=>{
    return {
        doctorId:doctorInfo.id,
        specialtiesId:specialties
    }
})

  const createDoctorSpecialities = await transactionClient.doctorSpecialties.createMany({
    data:doctorSpecialities
  })
  return updateDoctorData
})




return result
}


export const DoctorServices = {
    updateDoctor
}