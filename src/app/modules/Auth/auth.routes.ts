import express from "express"
import { AuthControllers } from "./auth.controller"
import auth from "../../middlewars/auth"
import { UserRole } from "@prisma/client"

const router = express.Router()

router.post("/login",AuthControllers.loginUser)

router.post("/refresh-token",AuthControllers.refreshToken)

router.post("/change-password",
auth(UserRole.ADMIN,UserRole.DOCTOR,UserRole.PATIENT,UserRole.SUPER_ADMIN),
AuthControllers.changePassword
)

export const AuthRoutes = router;