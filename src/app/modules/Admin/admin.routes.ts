import express from "express"
import { adminControllers } from "./admin.controller";

import validateRequest from "../../middlewars/validateRequest";
import { adminValidationsSchemas } from "./admin.validation";
import auth from "../../middlewars/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();










router.get(
    "/",
auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
 adminControllers.getAllAdmin
 )
router.get("/:id",
auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
adminControllers.getSingleAdminById
)


router.patch("/:id",
auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
validateRequest(adminValidationsSchemas.updateAdmin),
adminControllers.updateSingleAdmin
)

router.delete("/:id",
auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
adminControllers.deleteSingleAdmin
)

router.delete("/soft/:id",
auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
adminControllers.softDeleteSingleAdmin
)


export const adminRoutes = router;