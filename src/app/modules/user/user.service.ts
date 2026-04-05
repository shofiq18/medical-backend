import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import prisma from '../../../shared/prisma.js';
import { generateToken } from '../../../utils/jwt.js';
import { sendPasswordResetEmail } from '../../../utils/email.js';

const SALT_ROUNDS = 12;
const RESET_TOKEN_EXPIRY_MINUTES = 15;

// ─── Helper: Generate a secure hex token ──────────────────────────────
const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// ═══════════════════════════════════════════════════════════════════════
// REGISTER
// ═══════════════════════════════════════════════════════════════════════
const registerUser = async (payload: { email: string; password: string; name?: string }) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

  // Create the user (verified by default, can login immediately)
  const user = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      name: payload.name,
      isVerified: true,
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    message: 'User registered successfully.',
  };
};



// ═══════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════
const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const accessToken = generateToken(user);

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};

// ═══════════════════════════════════════════════════════════════════════
// FORGOT PASSWORD
// ═══════════════════════════════════════════════════════════════════════
const forgotPassword = async (payload: { email: string }) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });

  if (!user) {
    // For security, don't reveal whether the email exists
    return { message: 'If an account with that email exists, a password reset link has been sent.' };
  }

  // Generate reset token
  const resetPasswordToken = generateResetToken();
  const resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);

  await prisma.user.update({
    where: { email: payload.email },
    data: {
      resetPasswordToken,
      resetPasswordExpires,
    },
  });

  // Send password reset email (simulated)
  await sendPasswordResetEmail(user.email, resetPasswordToken);

  return { message: 'If an account with that email exists, a password reset link has been sent.' };
};

// ═══════════════════════════════════════════════════════════════════════
// RESET PASSWORD
// ═══════════════════════════════════════════════════════════════════════
const resetPassword = async (payload: { token: string; newPassword: string }) => {
  // Find user by reset token
  const user = await prisma.user.findFirst({
    where: { resetPasswordToken: payload.token },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  if (!user.resetPasswordExpires || new Date() > user.resetPasswordExpires) {
    throw new Error('Reset token has expired. Please request a new one.');
  }

  // Hash the new password and clear the reset token
  const hashedPassword = await bcrypt.hash(payload.newPassword, SALT_ROUNDS);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });

  return { message: 'Password has been reset successfully. You can now log in with your new password.' };
};

export const UserService = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
