import { AppError } from '../utils/AppError.js';

export function notFoundHandler(req, _res, next) {
    next(new AppError(404, 'NOT_FOUND', `Route ${req.method} ${req.originalUrl} not found`));
}

// Four-argument signature required by Express
export function errorHandler(err, _req, res, _next) {
    // Handle malformed JSON from express.json()
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: {
                code: 'MALFORMED_JSON',
                message: 'Malformed JSON in request body',
                details: null,
            },
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
            },
        });
    }

    console.error('Unhandled Error:', err);
    return res.status(500).json({
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred',
            details: null,
        },
    });
}