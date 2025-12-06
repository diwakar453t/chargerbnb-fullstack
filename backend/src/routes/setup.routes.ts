import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/postgres/User.model';

const router = express.Router();

/**
 * POST /api/setup/seed-admin
 * One-time endpoint to seed admin user in production
 * This should be called once after deployment
 */
router.post('/seed-admin', async (req: Request, res: Response) => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ where: { email: 'Admin@gmail.com' } });

        if (existingAdmin) {
            return res.status(400).json({
                error: 'Admin user already exists',
                message: 'Admin user has already been created. Please use the login page.'
            });
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('Admin453t@', 10);

        const admin = await User.create({
            email: 'Admin@gmail.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            phoneNumber: '+919999999999',
            role: 'ADMIN',
            isActive: true,
            isVerified: true
        });

        console.log('✅ Admin user created successfully via API');

        res.json({
            success: true,
            message: 'Admin user created successfully!',
            email: 'Admin@gmail.com',
            note: 'You can now login with the default password. Please change it immediately!'
        });
    } catch (error: any) {
        console.error('Error seeding admin user:', error);
        res.status(500).json({
            error: 'Failed to create admin user',
            details: error.message
        });
    }
});

/**
 * GET /api/setup/check-admin
 * Check if admin user exists
 */
router.get('/check-admin', async (req: Request, res: Response) => {
    try {
        const admin = await User.findOne({
            where: { email: 'Admin@gmail.com', role: 'ADMIN' }
        });

        res.json({
            adminExists: !!admin,
            message: admin
                ? 'Admin user exists. You can login.'
                : 'Admin user not found. Please seed the admin user.'
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
