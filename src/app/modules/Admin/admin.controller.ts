import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
    try {
        const result = await adminServices.getAllAdmin();
        res.status(200).json({
            success: true,
            message: "Admins are retrieve successfully",
            data: result
        })
    }
    catch (err) {

    }
}


export const adminControllers = {
    getAllAdmin
}