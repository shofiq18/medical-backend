import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { User } from '../generated/prisma/client.js';

const JWT_SECRET: jwt.Secret = config.jwt_secret || 'supersecretkey123';
const JWT_EXPIRES_IN = config.jwt_expires_in || '1d';

export const generateToken = (user: User): string => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  );
  return token;
};
