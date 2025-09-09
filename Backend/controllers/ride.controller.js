import rideService from "../services/ride.service.js";
import {
  getAddressCoordinates,
  getCaptainInRadius,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import CaptainModel from "../models/captain.model.js";
import RideModel from "../models/ride.model.js";
export const createRide = async (req, res) => {
  try {
    const { userId, pickup, destination, vehicleType } = req.body;

    if (!pickup || !destination || !vehicleType) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Get coordinates before creating ride
    const pickupCoordinates = await getAddressCoordinates(pickup);
    
    if (
      !pickupCoordinates ||
      !pickupCoordinates.ltd ||
      !pickupCoordinates.lng
    ) {
      return res.status(400).json({ error: "Invalid pickup location" });
    }

    const ride = await rideService.createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const captainsInRange = await getCaptainInRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      1000
    );

    

    ride.otp = "";

    // Send response first
    res.status(201).json(ride);

    const userWithRide = await RideModel.findOne({ _id: ride._id }).populate({
      path: "user",
      select: "-password -createdAt", // Exclude password and createdAt
    });

    if (!userWithRide.user) {
      console.error("Failed to populate user data for ride:", ride._id);
    } else {
      
    }

    // Then notify captains (after response is sent)
    if (captainsInRange && captainsInRange.length > 0) {
      
      captainsInRange.map(async (captain) => {
        try {
          await sendMessageToSocketId(captain.socketId, {
            event: "new-ride",
            data: { ride: userWithRide },
          });
        } catch (err) {
          console.error("Failed to notify captain:", captain.socketId, err);
        }
      });
    }
  } catch (error) {
    console.error("Error creating ride:", error);
    // Only send error response if headers haven't been sent
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getFair = async (req, res) => {
  try {
    const { pickup, destination } = req.body;

    if (!pickup || !destination) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const fair = await rideService.getFare(pickup, destination);
    res.status(200).json(fair);
  } catch (error) {
    console.error("Error calculating fare:", error);
    res.status(500).json({ error: error.message });
  }
};

export const confirmRide = async (req, res) => {
  try {
    const { rideId, captainId } = req.body;

    if (!rideId || !captainId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const confirmedRide = await rideService.confirmRide(rideId, captainId);
    res.status(200).json(confirmedRide);

    const confirmedRideWithUser = await RideModel.findOne({
      _id: confirmedRide._id,
    })
      .populate({
        path: "user",
        select: "-password -createdAt -otp",
      })
      .populate({
        path: "captain",
        select: "-password -createdAt -otp",
      });

    if (!confirmedRideWithUser.user) {
      console.error(
        "Failed to populate user data for confirmed ride:",
        confirmedRide._id
      );
    }

    // Send to captain
    if (
      confirmedRideWithUser.captain &&
      confirmedRideWithUser.captain.socketId
    ) {
      await sendMessageToSocketId(confirmedRideWithUser.captain.socketId, {
        event: "ride-confirmed",
        data: { ride: confirmedRideWithUser },
      });
    }

    // Send to user
    if (confirmedRideWithUser.user && confirmedRideWithUser.user.socketId) {
      await sendMessageToSocketId(confirmedRideWithUser.user.socketId, {
        event: "ride-confirmed",
        data: { ride: confirmedRideWithUser },
      });
    }
  } catch (error) {
    console.error("Error confirming ride:", error);
    res.status(500).json({ error: error.message });
  }
};

export const startRide = async (req, res) => {
  try {
    const { rideId, otp } = req.query;
    console.log("OTP:", otp);
    console.log("rideId:", rideId);
    const captain = req.captain;

    if (!rideId || !otp) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const startedRide = await rideService.startRide(rideId, otp, captain);
    res.status(200).json(startedRide);

    if (startedRide.user && startedRide.user.socketId) {
      await sendMessageToSocketId(startedRide.user.socketId, {
        event: "ride-started",
        data: { ride: startedRide },
      });
    }
  } catch (error) {
    console.error("Error starting ride:", error);
    res.status(500).json({ error: error.message });
  }
};

export const endRide = async (req, res) => {
  try {
    const { rideId } = req.query;

    if (!rideId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const endedRide = await rideService.endRide(rideId, req.captain);
    res.status(200).json(endedRide);

    if (endedRide.user && endedRide.user.socketId) {
      await sendMessageToSocketId(endedRide.user.socketId, {
        event: "ride-end",
        data: { ride: endedRide },
      });
    }
  } catch (error) {
    console.error("Error ending ride:", error);
    res.status(500).json({ error: error.message });
  }
};
