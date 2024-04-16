import express from 'express'
import {UserRole } from '@prisma/client';
import { DoctorValidations } from './doctor.validation';
import auth from '../../middlewars/auth';
import validateRequest from '../../middlewars/validateRequest';
import { DoctorControllers } from './doctor.controller';

const router = express.Router();

// task 3
router.get('/', DoctorControllers.getAllFromDB);

//task 4
router.get('/:id', DoctorControllers.getByIdFromDB);

router.patch(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    validateRequest(DoctorValidations.update),
    DoctorControllers.updateIntoDB
);

//task 5
router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    DoctorControllers.deleteFromDB
);

// task 6
router.delete(
    '/soft/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    DoctorControllers.softDelete);

export const DoctorRoutes = router