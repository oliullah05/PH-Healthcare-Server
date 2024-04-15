import express, { NextFunction, Request, Response } from "express"
import { SpecialtiesControllers } from "./specialties.controller";
import { fileUploader } from "../../../hepers/fileUploader";

const router = express.Router()

router.post("/", fileUploader.upload.single("file"),
(req: Request, res: Response, next: NextFunction) => {
  req.body = JSON.parse(req.body.data)
 
  next()
}, SpecialtiesControllers.createSpecialties)

export const SpecialtiesRoutes = router;