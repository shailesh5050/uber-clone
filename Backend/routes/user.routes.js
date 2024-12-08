import express from "express";
import { body } from "express-validator";
const router = express.Router();
import { resgisterUser } from "../controllers/user.controller.js";
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

export default router;
