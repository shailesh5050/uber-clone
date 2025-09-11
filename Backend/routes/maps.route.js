import express from 'express';
const router = express.Router();
import { authUser } from '../middlrewares/auth.middlreware.js';
import { query } from 'express-validator';
import {
  getCoordinates,
  getDistanceTime,
  getSugestions,
} from '../controllers/map.controller.js';
router.get('/get-coordinates', authUser, getCoordinates);
router.get(
  '/get-distance-time',
  query('origin').notEmpty().withMessage('Origin is required'),
  query('destination').notEmpty().withMessage('Destination is required'),
  authUser,
  getDistanceTime
);
router.get(
  '/get-sugestions',
  query('input').notEmpty().withMessage('Input is required'),
  authUser,
  getSugestions
);

export default router;
