import { Patient, Prisma, UserStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPatientFilterRequest, IPatientUpdate } from './patient.interface';

import { patientSearchableFields } from './patient.constants';
import { paginationHelper } from '../../../hepers/paginationHelpers';
import { IPaginationOptions } from '../../interface/pagination';

const getAllFromDB = async (
    filters: IPatientFilterRequest,
    options: IPaginationOptions,
) => {
    const { limit, page, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: patientSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                return {
                    [key]: {
                        equals: (filterData as any)[key],
                    },
                };
            }),
        });
    }
    andConditions.push({
        isDeleted: false,
    });

    const whereConditions: Prisma.PatientWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.patient.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc',
                },
        include: {
            medicalReport: true,
            patientHealthData: true,
        }
    });
    const total = await prisma.patient.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};

const getByIdFromDB = async (id: string): Promise<Patient | null> => {
    const result = await prisma.patient.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            medicalReport: true,
            patientHealthData: true,
        },
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<IPatientUpdate>): Promise<Patient | null> => {

    const { patientHealthData, medicalReport, ...patientData } = payload;
    // console.log({patientHealthData,medicalReport,patientData});
    const patientInfo = await prisma.patient.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.$transaction(async (transactionClient) => {
        // updating patient data
        await transactionClient.patient.update({
            where: {
                id
            },
            data: patientData,
            include: {
                patientHealthData: true,
                medicalReport: true
            }
        })

        // create or update patient health data
        if (patientHealthData) {
            await transactionClient.patientHealthData.upsert({
                where: {
                    patientId: patientInfo.id
                },
                update: patientHealthData,
                create: { ...patientHealthData, patientId: patientInfo.id }
            })
        }
        // create or update medicalReport
        if (medicalReport) {
            await transactionClient.medicalReport.create({
                data: { ...medicalReport, patientId: patientInfo.id }
            })
        }
        const responseResult = await transactionClient.patient.findUnique({
            where: {
                id: patientInfo.id
            },
            include: {
                medicalReport: true,
                patientHealthData: true
            }
        })
        return responseResult
    })

    return result
};


const deleteFromDB = async (id: string) => {
  const patientInfo =  await prisma.patient.findUniqueOrThrow({
        where:{
            id
        }
    })
    const result = await prisma.$transaction(async (tx) => {
        // delete medical report 
        await tx.medicalReport.deleteMany({
            where: {
                patientId: id
            }
        })

        // delete patientHealthData 
        await tx.patientHealthData.delete({
            where: {
                patientId: id
            }
        })

    // delete user
    await tx.user.delete({
        where: {
            email: patientInfo.email
        }
    })




        // delete patient
        const deletedPatient = await tx.patient.delete({
            where: {
                id
            }
        })
      
    

        return deletedPatient
    })

    return result
}



export const PatientServices = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
};