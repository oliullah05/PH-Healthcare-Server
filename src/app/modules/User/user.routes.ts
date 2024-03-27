import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../hepers/fileUploader";
import auth from "../../middlewars/auth";
import { userController } from "./user.controller";
import { userValidation } from "./user.validition";

const router = express.Router();





router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data))
   
    next()
  }, userController.createAdmin
)

export const userRoutes = router;


