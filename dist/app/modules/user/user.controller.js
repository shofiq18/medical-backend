import httpStatus from 'http-status';
import { UserService } from './user.service.js';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, } from './user.schema.js';
// ─── REGISTER ────────────────────────────────────────────────────────
const register = async (req, res, next) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Validation error',
                errors: parsed.error.issues,
            });
            return;
        }
        const result = await UserService.registerUser(parsed.data);
        res.status(httpStatus.CREATED).json({
            success: true,
            message: result.message,
            data: {
                id: result.id,
                email: result.email,
                name: result.name,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
// ─── LOGIN ────────────────────────────────────────────────────────────
const login = async (req, res, next) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Validation error',
                errors: parsed.error.issues,
            });
            return;
        }
        const result = await UserService.loginUser(parsed.data);
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Login successful',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
// ─── FORGOT PASSWORD ──────────────────────────────────────────────────
const forgotPassword = async (req, res, next) => {
    try {
        const parsed = forgotPasswordSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Validation error',
                errors: parsed.error.issues,
            });
            return;
        }
        const result = await UserService.forgotPassword(parsed.data);
        res.status(httpStatus.OK).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        next(error);
    }
};
// ─── RESET PASSWORD ──────────────────────────────────────────────────
const resetPassword = async (req, res, next) => {
    try {
        const parsed = resetPasswordSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Validation error',
                errors: parsed.error.issues,
            });
            return;
        }
        const result = await UserService.resetPassword(parsed.data);
        res.status(httpStatus.OK).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        next(error);
    }
};
export const UserController = {
    register,
    login,
    forgotPassword,
    resetPassword,
};
