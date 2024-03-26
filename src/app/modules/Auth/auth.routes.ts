import express from "express"
import { AuthControllers } from "./auth.controller"

import { UserRole } from "@prisma/client"
import auth from "../../middlewars/auth"

const router = express.Router()

router.post("/login",AuthControllers.loginUser)

router.post("/refresh-token",AuthControllers.refreshToken)
router.post("/forgot-password",AuthControllers.forgotPassword)

router.post("/change-password",
auth(UserRole.ADMIN,UserRole.DOCTOR,UserRole.PATIENT,UserRole.SUPER_ADMIN),
AuthControllers.changePassword
)

export const AuthRoutes = router;