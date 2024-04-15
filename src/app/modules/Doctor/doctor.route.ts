import express from "express"
import { DoctorControllers } from "./doctor.controller";

const router = express.Router();
router.patch("/:id",DoctorControllers.updateDoctor)
export const DoctorRoutes = router