import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../hepers/fileUploader";
import auth from "../../middlewars/auth";
import { userController } from "./user.controller";
import { userValidation } from "./user.validition";

const router = express.Router();


router.get("/", auth(UserRole.SUPER_ADMIN,UserRole.ADMIN), userController.getAllUser);
router.get("/me", auth(UserRole.SUPER_ADMIN,UserRole.ADMIN,UserRole.DOCTOR,UserRole.PATIENT), userController.getMyProfile);

router.patch("/:id/status", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),userController.changeProfileStatus)



router.post("/create-admin", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data))
   
    next()
  }, userController.createAdmin
)


router.post("/create-doctor", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data))
   
    next()
  }, userController.createDoctor
)


router.patch("/update-my-profile",auth(UserRole.SUPER_ADMIN,UserRole.ADMIN,UserRole.DOCTOR,UserRole.PATIENT),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data))
    req.body = JSON.parse(req.body.data)
   
    next()
  },
  
  userController.updateMyProfile
)

export const userRoutes = router;


