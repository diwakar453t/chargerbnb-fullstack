import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware';
import User from '../models/postgres/User.model';
import Charger from '../models/postgres/Charger.model';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRoles('ADMIN'));

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/hosts', async (req, res) => {
  try {
    const hosts = await User.findAll({
      where: { role: 'HOST' },
      attributes: { exclude: ['password'] }
    });
    res.json(hosts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/chargers/:id/approve', async (req, res) => {
  try {
    const charger = await Charger.findByPk(req.params.id);
    if (!charger) {
      return res.status(404).json({ error: 'Charger not found' });
    }

    charger.isApproved = true;
    await charger.save();

    res.json(charger);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

