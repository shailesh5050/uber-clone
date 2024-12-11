import { validationResult } from "express-validator";
import { createCaptainService } from "../services/captain.service.js";
import CaptainModel from "../models/captain.model.js";
export async function captainRegister(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehiicle } = req.body;
  const existingCaptain = await CaptainModel.findOne({ email });
  if (existingCaptain) {
    return res.status(400).json({ msg: "captain already exist" });
  }
  const hashedPassword = await CaptainModel.hashPassword(password);
  const captain = await createCaptainService({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    plate: vehiicle.plate,
    color: vehiicle.color,
    capacity: vehiicle.capacity,
    vehicleType: vehiicle.vehicleType,
  });
  const token = await captain.generateAuthToken();
  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  });
  res.status(201).json({ captain: captain, token });
}
