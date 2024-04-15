import { Doctor, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";

const updateDoctor = async(id:string,payload:Doctor & {specialties:[{specialtiesId:string,isDeleted:boolean}]})=>{
const {specialties,...doctorData} = payload;
const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where:{
        id
    }
})



const result =await  prisma.$transaction(async(transactionClient)=>{

    const updateDoctorData = transactionClient.doctor.update({
        where:{
            id
        },
        data:doctorData
    })



    let deleteSpacialtiesIds:string[] =[];
    let createSpacialtiesIds:string[] =[];
    if(specialties && specialties.length>0){ 
        specialties.filter(s=>{
            if(s.isDeleted===true) {
                deleteSpacialtiesIds.push(s.specialtiesId)
            }
            if(s.isDeleted===false) {
                createSpacialtiesIds.push(s.specialtiesId)
               }
        })
    }


const doctorSpecialitiesCreateData= createSpacialtiesIds.map((specialties)=>{
    return {
        doctorId:doctorInfo.id,
        specialtiesId:specialties
    }
})


  const createDoctorSpecialities = await transactionClient.doctorSpecialties.createMany({
    data:doctorSpecialitiesCreateData
  })

  const deleteDoctorSpecialities = await transactionClient.doctorSpecialties.deleteMany({
   where:{
    specialtiesId:{
        in:deleteSpacialtiesIds
    }
   }
  })




  return updateDoctorData
})




return result
}


export const DoctorServices = {
    updateDoctor
}