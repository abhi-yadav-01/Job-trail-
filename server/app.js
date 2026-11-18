import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { requestLogger } from './middleware/logger.js';
import { authenticate } from './middleware/auth.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import authRouter from './routes/auth.routes.js';
import applicationRouter from './routes/application.routes.js';

const app = express();

// 1. Request logger
app.use(requestLogger);

// 2. Helmet security headers
app.use(helmet());

// 3. Exact-origin CORS
app.use(
    cors({
        origin: env.CLIENT_ORIGIN,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// 4. JSON body parser with size limit
app.use(express.json({ limit: '100kb' }));

// 5. Public routes
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});

app.use('/api/auth', authRouter);

// 6 & 7. Authentication middleware + Protected routes
app.use('/api/applications', authenticate, applicationRouter);

// 8. Not-found middleware
app.use(notFoundHandler);

// 9. Central error handler
app.use(errorHandler);

export default app;