import express from "express";
const router = express.Router();
import {authUser} from  "../middlrewares/auth.middlreware.js";
import {body} from "express-validator";
import {createRide} from "../controllers/ride.controller.js"
router.post("/create-ride",authUser,[
    body("pickup").notEmpty().withMessage("Origin is required"),
    body("destination").notEmpty().withMessage("Destination is required"),
    body("userId").notEmpty().withMessage("User is required"),
    body("vehicleType").isIn(['auto','car','motocycle']).withMessage("Vehicle Type is Valid"),
],createRide);

export default router;