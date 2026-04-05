import { Router } from 'express';
import { UserController } from './user.controller.js';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);

export const UserRoutes = router;
