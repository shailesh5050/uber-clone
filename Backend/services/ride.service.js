import { get } from "http";
import RideModel from "../models/ride.model.js";
import {getDistanceTimeData} from "./maps.service.js"
import crypto from "crypto";

//functon to get fare based on time and distance
async function getFare(pickup, destination) {
    // calculate fare based on distance and duration
    const timeDistance = await getDistanceTimeData(pickup, destination);
    const BASE_FARE = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const PER_KM_RATE = {
        auto: 15,
        car: 20,
        motorcycle: 10
    };

    const WAITING_CHARGE = {
        auto: 2,
        car: 3,
        motorcycle: 1
    };

    const fareMap = {
        auto: BASE_FARE.auto + (parseFloat(timeDistance.distance) * PER_KM_RATE.auto) + (parseFloat(timeDistance.duration) * WAITING_CHARGE.auto),
        car: BASE_FARE.car + (parseFloat(timeDistance.distance) * PER_KM_RATE.car) + (parseFloat(timeDistance.duration )* WAITING_CHARGE.car),
        motorcycle: BASE_FARE.motorcycle + (parseFloat(timeDistance.distance )* PER_KM_RATE.motorcycle) + (parseFloat(timeDistance.duration) * WAITING_CHARGE.motorcycle)
    };

    const fare = fareMap;


    return fare;
}
//function to create OTP using crypto
function createOTP() {
    return crypto.randomInt(100000, 999999);
}

const createRide = async ({ userId, pickup, destination, vehicleType}) => {

   const fare = await getFare(pickup, destination);
   console.log(createOTP());
   const res = await RideModel.create({
        user: userId,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: createOTP(),
    })
    return res;
    
};



export default {
    // ...existing exports...
    createRide,
    getFare,
};

//create a array that have 10  fake users json
