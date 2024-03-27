import { Gender } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
    password:z.string({required_error:"Password is required"}),
    admin:z.object({
        name:z.string({required_error:"Name is required"}),
        email:z.string({required_error:"Email is required"}),
        contactNumber:z.string({required_error:"Contact is required"}),
        
    })
})



const createDoctor = z.object({
    password:z.string({required_error:"Password is required"}),
    doctor:z.object({
        name: z.string(),
        email: z.string().email(),
        contactNumber: z.string(),
        address: z.string().optional(),
        registrationNumber: z.string(),
        experience: z.number().int().default(0).optional(),
        gender: z.enum([Gender.MALE,Gender.FEMALE]),
        appointmentFee: z.number().int(),
        qualification: z.string(),
        currentWorkingPlace: z.string(),
        designation: z.string()
    })
})



export const userValidation = {
    createAdmin,
    createDoctor
}