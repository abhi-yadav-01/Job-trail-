import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { userRepository } from '../repositories/user.mongo.repository.js';
import { AppError } from '../utils/AppError.js';

export async function authenticate(req, _res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {

        return next(
            new AppError(401, 'UNAUTHORIZED', 'Authentication token is required')
        );
    }

    const token = authHeader.slice(7).trim();
    try {
        const payload = jwt.verify(token, env.JWT_SECRET, {
            algorithms: ['HS256'],
        });

        console.log("Authenticated user payload:", payload);

        const user = await userRepository.findById(payload.sub);
        if (!user) {
            return next(new AppError(401, 'UNAUTHORIZED', 'Invalid authentication user'));
        }

        req.user = { id: user._id, email: user.email, name: user.name };
        return next();
    } catch (err) {
        console.error('Auth error:', err.message);
        return next(
            new AppError(401, 'UNAUTHORIZED', 'Invalid or expired authentication token')
        );
    }
}