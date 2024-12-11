import express from "express";
const captainRouter = express.Router();
import { captainRegister } from "../controllers/captain.controller.js";
import { body } from "express-validator";

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
    body("vehiicle.color")
      .isString()
      .withMessage("Vehicle color must be a string")
      .notEmpty()
      .withMessage("Vehicle color is required"),

    // Validate vehiicle.plate
    body("vehiicle.plate")
      .isString()
      .withMessage("Vehicle plate must be a string")
      .notEmpty()
      .withMessage("Vehicle plate is required"),

    // Validate vehiicle.model
    body("vehiicle.model")
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
export default captainRouter;
