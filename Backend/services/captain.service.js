import CaptainModel from "../models/captain.model.js";

export async function createCaptainService({
  firstname,
  lastname,
  plate,
  color,
  capacity,
  vehicleType,
  email,
  password,
}) {
  console.log({
    firstname,
    lastname,
    plate,
    color,
    capacity,
    vehicleType,
    email,
    password,
  });
  try {
    if (
      !firstname ||
      !lastname ||
      !plate ||
      !color ||
      !capacity ||
      !vehicleType ||
      !email ||
      !password
    ) {
      throw new Error("Missing parameters");
    }
    const captain = await CaptainModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });

    return captain;
  } catch (error) {
    throw new Error(`Could not create captain: ${error.message}`);
  }
}
