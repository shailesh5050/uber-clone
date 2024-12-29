import rideService from "../services/ride.service.js";

export const createRide = async (req, res) => {
    try {
        const { userId, pickup, destination,vehicleType } = req.body;
        const ride = await rideService.createRide({
            userId: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


