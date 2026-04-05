import { Router } from 'express';
import { DoctorController } from './doctor.controller.js';

const router = Router();

router.post('/create', DoctorController.createDoctor);
router.get('/', DoctorController.getAllDoctors);

export const DoctorRoutes = router;