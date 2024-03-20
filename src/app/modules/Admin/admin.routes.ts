import express from "express"
import { adminControllers } from "./admin.controller";

const router = express.Router();

router.get("/",adminControllers.getAllAdmin)
router.get("/:id",adminControllers.getSingleAdminById)


export const adminRoutes = router;