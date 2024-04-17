import express from 'express';
import { PatientController } from './patient.controller';
import auth from '../../middlewars/auth';

const router = express.Router();

router.get(
    '/',
    PatientController.getAllFromDB
);

router.get(
    '/:id',auth(),
    PatientController.getByIdFromDB
);

router.patch(
    '/:id',auth(),
    PatientController.updateIntoDB
);

router.delete(
    '/:id', auth(),
    PatientController.deleteFromDB
);



export const PatientRoutes = router;