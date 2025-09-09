import { get } from "http";
import RideModel from "../models/ride.model.js";
import { getDistanceTimeData } from "./maps.service.js";
import crypto from "crypto";
import UserModel from "../models/user.model.js";
import CaptainModel from "../models/captain.model.js";

//functon to get fare based on time and distance
async function getFare(pickup, destination) {
  // calculate fare based on distance and duration
  const timeDistance = await getDistanceTimeData(pickup, destination);
  const BASE_FARE = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const PER_KM_RATE = {
    auto: 15,
    car: 20,
    motorcycle: 10,
  };

  const WAITING_CHARGE = {
    auto: 2,
    car: 3,
    motorcycle: 1,
  };

  const fareMap = {
    auto:
      BASE_FARE.auto +
      parseFloat(timeDistance.distance) * PER_KM_RATE.auto +
      parseFloat(timeDistance.duration) * WAITING_CHARGE.auto,
    car:
      BASE_FARE.car +
      parseFloat(timeDistance.distance) * PER_KM_RATE.car +
      parseFloat(timeDistance.duration) * WAITING_CHARGE.car,
    motorcycle:
      BASE_FARE.motorcycle +
      parseFloat(timeDistance.distance) * PER_KM_RATE.motorcycle +
      parseFloat(timeDistance.duration) * WAITING_CHARGE.motorcycle,
  };

  const fare = fareMap;

  return fare;
}
//function to create OTP using crypto
function createOTP() {
  return crypto.randomInt(100000, 999999);
}

const createRide = async ({ userId, pickup, destination, vehicleType }) => {
  const fare = await getFare(pickup, destination);
  
  const res = await RideModel.create({
    user: userId,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: createOTP(),
  });
  return res;
};

async function confirmRide(rideId, captainId) {
  const updatedRide = await RideModel.findOneAndUpdate(
    { _id: rideId },
    { $set: { captain: captainId, status: "accepted" } },
    { new: true }
  );
  return updatedRide._id;
}

async function startRide(rideId, otp, captain) {
  const ride = await RideModel.findOne({ _id: rideId });
  
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.otp != otp) {
    throw new Error("Invalid OTP");
  }

  if (ride.status == "ongoing") {
    throw new Error("Ride already started");
  }
  const updatedRide = await RideModel.findOneAndUpdate(
    { _id: rideId },
    { $set: { captain: captain._id, status: "ongoing" } },
    { new: true }
  );
  //get socket id from user and send to captain
  let user = await UserModel.findOne({ _id: updatedRide.user });
  let captainData = await CaptainModel.findOne({ _id: updatedRide.captain });
  user = {
    socketId: user.socketId,
    fullname: user.fullname,
    email: user.email,
  };
  captainData = {
    socketId: captain.socketId,
    fullname: captain.fullname,
    email: captain.email,
    plate: captain.plate,
  };
  return { ...updatedRide._doc, user, captainData };
}

async function endRide(rideId, captain) {
  const updatedRide = await RideModel.findOneAndUpdate(
    { _id: rideId, captain: captain._id },
    { $set: { status: "completed" } },
    { new: true }
  );
  //get socket id from user and send to captain
  let user = await UserModel.findOne({ _id: updatedRide.user });
  let captainData = await CaptainModel.findOne({ _id: updatedRide.captain });
  user = {
    socketId: user.socketId,
    fullname: user.fullname,
    email: user.email,
  };
  captainData = {
    socketId: captain.socketId,
    fullname: captain.fullname,
    email: captain.email,
    plate: captain.plate,
  };
  return { ...updatedRide._doc, user, captainData };
}

export default {
  // ...existing exports...
  createRide,
  getFare,
  confirmRide,
  startRide,
  endRide,
};

//create a array that have 10  fake users json
