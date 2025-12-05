import express from 'express';
import { body, validationResult } from 'express-validator';
import Charger from '../models/postgres/Charger.model';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware';
import { Op } from 'sequelize';

const router = express.Router();

// Get all approved chargers (public)
router.get('/public', async (req, res) => {
  try {
    const { latitude, longitude, radiusKm = 10 } = req.query;

    let chargers;

    if (latitude && longitude) {
      // Find nearby chargers using Haversine formula
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const radius = parseFloat(radiusKm as string);

      chargers = await Charger.findAll({
        where: {
          isApproved: true,
          isAvailable: true
        },
        include: [{ association: 'host', attributes: ['id', 'firstName', 'lastName'] }]
      });

      // Filter by distance (simplified - use PostGIS in production)
      chargers = chargers.filter((charger: any) => {
        const distance = calculateDistance(
          lat,
          lng,
          parseFloat(charger.latitude),
          parseFloat(charger.longitude)
        );
        return distance <= radius;
      });
    } else {
      chargers = await Charger.findAll({
        where: {
          isApproved: true,
          isAvailable: true
        },
        include: [{ association: 'host', attributes: ['id', 'firstName', 'lastName'] }]
      });
    }

    res.json(chargers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get charger by ID
router.get('/public/:id', async (req, res) => {
  try {
    const charger = await Charger.findByPk(req.params.id, {
      include: [{ association: 'host', attributes: ['id', 'firstName', 'lastName'] }]
    });

    if (!charger) {
      return res.status(404).json({ error: 'Charger not found' });
    }

    res.json(charger);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create charger (host only)
router.post('/',
  authenticateToken,
  authorizeRoles('HOST', 'ADMIN'),
  [
    body('title').trim().notEmpty(),
    body('powerRating').isFloat({ min: 0 }),
    body('pricePerHour').isFloat({ min: 0 }),
    body('latitude').isFloat(),
    body('longitude').isFloat()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const chargerData = {
        ...req.body,
        hostId: req.user!.userId,
        isApproved: req.user!.role === 'ADMIN'
      };

      const charger = await Charger.create(chargerData);
      res.status(201).json(charger);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get my chargers
router.get('/my-chargers', authenticateToken, async (req, res) => {
  try {
    const chargers = await Charger.findAll({
      where: { hostId: req.user!.userId }
    });
    res.json(chargers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to calculate distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default router;

