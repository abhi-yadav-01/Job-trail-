
import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';

const users = new Map();

// Seed demo user
// Email: jane@gmail.com
// Password: Password@123
const demoUser = {
    id: 'demo-user-jane-1',
    name: 'ayush Doe',
    email: 'jane@gmail.com',
    passwordHash: bcrypt.hashSync('Password@123', 10),
    masterResume: '',
    createdAt: new Date().toISOString(),
};

users.set(demoUser.id, demoUser);

export const userRepository = {
    // Find user by email
    async findByEmail(email) {
        const normalized = email.trim().toLowerCase();

        for (const user of users.values()) {
            if (user.email === normalized) {
                return structuredClone({ user });
            }
        }

        return null;
    },


    // Create new user
    async create(userData) {
        const normalizedEmail = userData.email.trim().toLowerCase();

        // Prevent duplicate email
        for (const user of users.values()) {
            if (user.email === normalizedEmail) {
                throw new Error('Email is already registered');
            }
        }

        const user = {
            id: randomUUID(),
            _id: randomUUID(),
            name: userData.name.trim(),
            email: normalizedEmail,
            passwordHash: userData.passwordHash,
            masterResume: '',
            createdAt: new Date().toISOString(),
        };


        users.set(user.id, user);

        return structuredClone(user);
    },
};
