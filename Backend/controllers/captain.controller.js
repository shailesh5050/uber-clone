import { validationResult } from 'express-validator';
import { createCaptainService } from '../services/captain.service.js';
import BlacklistToken from '../models/blackListToken.model.js';
import CaptainModel from '../models/captain.model.js';
export async function captainRegister(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const existingCaptain = await CaptainModel.findOne({ email });
  if (existingCaptain) {
    return res.status(400).json({ msg: 'captain already exist' });
  }
  const hashedPassword = await CaptainModel.hashPassword(password);
  const captain = await createCaptainService({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    plate: vehicle.plate,
    color: vehicle.color,
    capacity: vehicle.vehicleCapacity,
    vehicleType: vehicle.type,
  });
  const token = await captain.generateAuthToken();
  res.cookie('token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  });
  res.status(201).json({ captain: captain, token });
}

export async function loginCaptain(req, res, next) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array() });
    }
    const { email, password } = req.body;
    const captain = await CaptainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('captain_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    });
    res.status(200).json({ captain, token });
  } catch (error) {
    next(error);
  }
}

export async function getCaptainProfile(req, res, next) {
  res.status(200).json({ captain: req.captain });
}

export async function logoutCaptain(req, res, next) {
  try {
    res.clearCookie('token');
    const token =
      req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    const blacklistToken = new BlacklistToken({ token });
    await blacklistToken.save();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
}
