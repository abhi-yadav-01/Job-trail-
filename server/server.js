import app from './app.js';
import { env } from './config/env.js';
import { connectMongoDB } from './config/mongodb.js';

async function start() {
    try {
        // Connect to MongoDB

        await connectMongoDB();


        app.listen(env.PORT, () => {
            console.log(
                `JobTrail Server listening on http://localhost:${env.PORT} (AUTH_REQUIRED=${env.AUTH_REQUIRED}, DB_TYPE=${env.DB_TYPE})`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

start();