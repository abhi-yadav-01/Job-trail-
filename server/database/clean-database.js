import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { User } from '../schemas/user.schema.js';
import { Application } from '../schemas/application.schema.js';

async function cleanDatabase() {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log('✓ Connected to MongoDB');

        const apps = await Application.deleteMany({});
        const users = await User.deleteMany({});

        console.log(`✓ Deleted ${apps.deletedCount} applications`);
        console.log(`✓ Deleted ${users.deletedCount} users`);

        await mongoose.disconnect();
        console.log('\n✓ Database cleaned successfully!');
    } catch (error) {
        console.error('✗ Cleaning failed:', error.message);
        process.exit(1);
    }
}

cleanDatabase();