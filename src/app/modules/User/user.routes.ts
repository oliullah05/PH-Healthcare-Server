import { UserRole } from "@prisma/client";
import express from "express";
import { fileUploader } from "../../../hepers/fileUploader";
import auth from "../../middlewars/auth";
import { userController } from "./user.controller";

const router = express.Router();






router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
   fileUploader.upload.single("file"),
    userController.createAdmin
)

export const userRoutes = router;


