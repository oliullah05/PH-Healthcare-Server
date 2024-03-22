import express from "express"
import { adminControllers } from "./admin.controller";

const router = express.Router();

router.get("/",adminControllers.getAllAdmin)
router.get("/:id",adminControllers.getSingleAdminById)
router.patch("/:id",adminControllers.updateSingleAdmin)
router.delete("/:id",adminControllers.deleteSingleAdmin)
router.delete("/soft/:id",adminControllers.softDeleteSingleAdmin)


export const adminRoutes = router;