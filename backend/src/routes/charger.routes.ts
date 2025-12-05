import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Charger from '../models/postgres/Charger.model';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Get all chargers (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { city, state, chargerType, available } = req.query;
    const where: any = {};

    if (city) where.city = city;
    if (state) where.state = state;
    if (chargerType) where.chargerType = chargerType;
    if (available) where.isAvailable = available === 'true';

    const chargers = await Charger.findAll({ where });
    res.json({ chargers });
  } catch (error: any) {
    console.error('Get chargers error:', error);
    res.status(500).json({ error: 'Failed to fetch chargers' });
  }
});

// Get charger by ID
router.get('/:id', async (req, res) => {
  try {
    const charger = await Charger.findByPk(req.params.id);
    if (!charger) {
      return res.status(404).json({ error: 'Charger not found' });
    }
    res.json({ charger });
  } catch (error: any) {
    console.error('Get charger error:', error);
    res.status(500).json({ error: 'Failed to fetch charger' });
  }
});

// Create charger (HOST only)
router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('chargerType').notEmpty().withMessage('Charger type is required'),
    body('powerRating').isNumeric().withMessage('Power rating must be a number'),
    body('pricePerHour').isNumeric().withMessage('Price per hour must be a number'),
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('pincode').notEmpty().withMessage('Pincode is required'),
  ],
  async (req: any, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if user is HOST
      if (req.user.role !== 'HOST') {
        return res.status(403).json({ error: 'Only hosts can add chargers' });
      }

      const chargerData = {
        ...req.body,
        hostId: req.user.userId,
        isAvailable: true,
        isApproved: false, // Requires admin approval
      };

      const charger = await Charger.create(chargerData);
      res.status(201).json({ message: 'Charger created successfully', charger });
    } catch (error: any) {
      console.error('Create charger error:', error);
      res.status(500).json({ error: 'Failed to create charger' });
    }
  }
);

// Update charger (HOST only - own chargers)
router.put('/:id', authenticate, async (req: any, res) => {
  try {
    const charger = await Charger.findByPk(req.params.id);

    if (!charger) {
      return res.status(404).json({ error: 'Charger not found' });
    }

    // Check if user owns this charger
    if (charger.hostId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to edit this charger' });
    }

    await charger.update(req.body);
    res.json({ message: 'Charger updated successfully', charger });
  } catch (error: any) {
    console.error('Update charger error:', error);
    res.status(500).json({ error: 'Failed to update charger' });
  }
});

// Delete charger (HOST only - own chargers)
router.delete('/:id', authenticate, async (req: any, res) => {
  try {
    const charger = await Charger.findByPk(req.params.id);

    if (!charger) {
      return res.status(404).json({ error: 'Charger not found' });
    }

    // Check if user owns this charger
    if (charger.hostId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this charger' });
    }

    await charger.destroy();
    res.json({ message: 'Charger deleted successfully' });
  } catch (error: any) {
    console.error('Delete charger error:', error);
    res.status(500).json({ error: 'Failed to delete charger' });
  }
});

// Get host's chargers
router.get('/host/my-chargers', authenticate, async (req: any, res) => {
  try {
    const chargers = await Charger.findAll({
      where: { hostId: req.user.userId }
    });
    res.json({ chargers });
  } catch (error: any) {
    console.error('Get host chargers error:', error);
    res.status(500).json({ error: 'Failed to fetch chargers' });
  }
});

export default router;
