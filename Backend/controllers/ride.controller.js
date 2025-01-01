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
    console.log("Pickup coordinates:"+pickupCoordinates.lng,pickupCoordinates.ltd);
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

    console.log("Captains in range:", captainsInRange);
    
    ride.otp = "";

    // Send response first
    res.status(201).json(ride);

    const userWithRide = await RideModel.findOne({ _id: ride._id })
      .populate({
        path: "user",
        select: "-password -createdAt", // Exclude password and createdAt
      });
    
    if (!userWithRide.user) {
      console.error("Failed to populate user data for ride:", ride._id);
    } else {
      console.log("User with ride:", userWithRide.toObject());
    }
    
    // Then notify captains (after response is sent)
    if (captainsInRange && captainsInRange.length > 0) {
      console.log("Notifying", captainsInRange.length, "captains about new ride");
      captainsInRange.map(async (captain) => {
        try {
          await sendMessageToSocketId(captain.socketId, {
            event: "new-ride",
            data: { ride: userWithRide },
          });
        } catch (err) {
          console.error("Failed to notify captain:", captain.socketId, err);
        }
      })
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
