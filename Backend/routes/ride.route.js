import express from 'express';
const router = express.Router();
import { authCaptain, authUser } from '../middlrewares/auth.middlreware.js';
import { body } from 'express-validator';
import {
  createRide,
  getFair,
  confirmRide,
  startRide,
  endRide,
} from '../controllers/ride.controller.js';
router.post(
  '/create-ride',
  authUser,
  [
    body('pickup').notEmpty().withMessage('Origin is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('userId').notEmpty().withMessage('User is required'),
    body('vehicleType')
      .isIn(['auto', 'car', 'motocycle'])
      .withMessage('Vehicle Type is Valid'),
  ],
  createRide
);

router.post(
  '/get-fair',
  authUser,
  [
    body('pickup').notEmpty().withMessage('Origin is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
  ],
  getFair
);

router.post(
  '/confirm',
  authCaptain,
  [
    body('rideId').notEmpty().withMessage('Ride is required'),
    // body("otp").notEmpty().withMessage("OTP is required"),
  ],
  confirmRide
);

router.get(
  '/start-ride',
  authCaptain,
  [
    body('rideId').notEmpty().withMessage('Ride is required'),
    body('otp').notEmpty().withMessage('OTP is required'),
  ],
  startRide
);

//end-ride

router.get(
  '/end-ride',
  authCaptain,
  [body('rideId').notEmpty().withMessage('Ride is required')],
  endRide
);

export default router;
