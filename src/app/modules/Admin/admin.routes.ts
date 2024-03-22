import express from "express"
import { adminControllers } from "./admin.controller";

import validateRequest from "../../middlewars/validateRequest";
import { adminValidationsSchemas } from "./admin.validation";

const router = express.Router();










router.get("/",adminControllers.getAllAdmin)
router.get("/:id",adminControllers.getSingleAdminById)
router.patch("/:id",validateRequest(adminValidationsSchemas.updateAdmin),adminControllers.updateSingleAdmin)
router.delete("/:id",adminControllers.deleteSingleAdmin)
router.delete("/soft/:id",adminControllers.softDeleteSingleAdmin)


export const adminRoutes = router;