import { z } from 'zod';
// ─── REGISTER ────────────────────────────────────────────────────────
export const registerSchema = z.object({
    email: z.string({ error: 'Email is required' }).email('Invalid email address'),
    password: z
        .string({ error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters'),
    name: z.string().optional(),
});
// ─── LOGIN ────────────────────────────────────────────────────────────
export const loginSchema = z.object({
    email: z.string({ error: 'Email is required' }).email('Invalid email address'),
    password: z.string({ error: 'Password is required' }),
});
// ─── FORGOT PASSWORD ──────────────────────────────────────────────────
export const forgotPasswordSchema = z.object({
    email: z.string({ error: 'Email is required' }).email('Invalid email address'),
});
// ─── RESET PASSWORD ──────────────────────────────────────────────────
export const resetPasswordSchema = z.object({
    token: z.string({ error: 'Reset token is required' }),
    newPassword: z
        .string({ error: 'New password is required' })
        .min(6, 'Password must be at least 6 characters'),
});
export const UserSchemas = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
};
