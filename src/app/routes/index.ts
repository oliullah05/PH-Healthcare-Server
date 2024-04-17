import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { PatientRoutes } from '../modules/Patient/patient.route';
import { adminRoutes } from '../modules/Admin/admin.routes';
import { SpecialtiesRoutes } from '../modules/Specialties/specialties.route';
import { DoctorRoutes } from '../modules/Doctor/doctor.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/admin',
        route: adminRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/patient',
        route: PatientRoutes
    },
   
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;

