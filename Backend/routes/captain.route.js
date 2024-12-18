import express from "express";
const captainRouter = express.Router();
import {
  captainRegister,
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
} from "../controllers/captain.controller.js";
import { body } from "express-validator";
import { authCaptain } from "../middlrewares/auth.middlreware.js";

captainRouter.post(
  "/register",
  [
    // Validate firstname
    body("fullname.firstname")
      .isString()
      .withMessage("First name must be a string")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long")
      .notEmpty()
      .withMessage("First name is required"),

    // Validate lastname
    body("fullname.lastname")
      .optional()
      .isString()
      .withMessage("Last name must be a string")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),

    // Validate email
    body("email")
      .isEmail()
      .withMessage("Must be a valid email address")
      .notEmpty()
      .withMessage("Email is required"),

    // Validate vehiicle.color
    body("vehicle.color")
      .isString()
      .withMessage("Vehicle color must be a string")
      .notEmpty()
      .withMessage("Vehicle color is required"),

    // Validate vehiicle.plate
    body("vehicle.plate")
      .isString()
      .withMessage("Vehicle plate must be a string")
      .notEmpty()
      .withMessage("Vehicle plate is required"),

    // Validate vehiicle.model
    body("vehicle.model")
      .optional()
      .isString()
      .withMessage("Vehicle model must be a string"),

    // Validate location.lat
    body("location.lat")
      .optional()
      .isNumeric()
      .withMessage("Latitude must be a number"),

    // Validate location.lng
    body("location.lng")
      .optional()
      .isNumeric()
      .withMessage("Longitude must be a number"),

    // Validate status
    body("status")
      .optional()
      .isIn(["active", "inactive"])
      .withMessage("Status must be either 'active' or 'inactive'"),
  ],
  captainRegister
);

//login route
captainRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 characters"),
  ],
  loginCaptain
);

//get captain profile
captainRouter.get("/profile", authCaptain, getCaptainProfile);
export default captainRouter;

//logoout route
captainRouter.get("/logout", authCaptain, logoutCaptain);
