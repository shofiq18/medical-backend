import jwt from 'jsonwebtoken';
import config from '../config/index.js';
const JWT_SECRET = config.jwt_secret || 'supersecretkey123';
const JWT_EXPIRES_IN = config.jwt_expires_in || '1d';
export const generateToken = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
};
