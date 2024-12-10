import express from "express";
import { body } from "express-validator";

const router = express.Router();
import {
  resgisterUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlrewares/auth.middlreware.js";
router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3, max: 30 })
      .withMessage("first name must be between 3 to 30 characters"),
    body("fullname.lastname")
      .isLength({ min: 3, max: 30 })
      .withMessage("last name must be between 3 to 30 characters"),
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 characters"),
  ],
  resgisterUser
);

//login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 characters"),
  ],
  loginUser
);

//profile Route
router.get("/profile", authUser, getUserProfile);

//logout
router.post("/logout", authUser, logoutUser);

export default router;
