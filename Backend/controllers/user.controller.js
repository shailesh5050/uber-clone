import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import BlacklistTokenModel from "../models/blackListToken.model.js";
export async function resgisterUser(req, res, next) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array() });
    }
    const { fullname, email, password } = req.body;
    //check if user exists
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    });
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function getUserProfile(req, res, next) {
  res.status(200).json({ user: req.user });
}

export async function logoutUser(req, res, next) {
  try {
    res.clearCookie("token");
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.token;
    const blacklistToken = new BlacklistTokenModel({ token });
    await blacklistToken.save();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}
