import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Placeholder routes - implement with Booking model
router.post('/', authenticateToken, async (req, res) => {
  res.json({ message: 'Booking creation - implement with Booking model' });
});

router.get('/my-bookings', authenticateToken, async (req, res) => {
  res.json({ message: 'Get user bookings - implement with Booking model' });
});

export default router;

