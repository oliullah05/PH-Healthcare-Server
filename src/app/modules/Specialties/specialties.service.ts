import { Request } from "express";
import { fileUploader } from "../../../hepers/fileUploader";
import { IFile } from "../../interface/file";
import prisma from "../../../shared/prisma";

const createSpecialties = async (req: Request) => {
    const file = req.file as IFile;
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToClodinary(file);
        req.body.icon = uploadToCloudinary?.secure_url
    }
    const result = await prisma.specialties.create({
        data:req.body
    })

    return result
}

export const SpecialtiesServices = {
    createSpecialties
}