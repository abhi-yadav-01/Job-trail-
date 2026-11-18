import { authService } from '../services/auth.services.js';

export const authController = {
    async register(req, res) {
        const { name, email, password } = req.body || {};
        const result = await authService.register({ name, email, password });
        res.status(201).json({ data: result });
    },
    async login(req, res) {
        const { email, password } = req.body || {};
        const result = await authService.login({ email, password });
        res.status(200).json({ data: result });
    },
};