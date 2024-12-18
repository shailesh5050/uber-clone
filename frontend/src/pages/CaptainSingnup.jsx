import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCaptainData } from "../Context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const { captain, setCaptain } = useCaptainData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Registration logic
    const userDataObj = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        type: vehicleType,
        vehicleCapacity: vehicleCapacity,
      },
      email,
      password,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        userDataObj
      );

      if (res.status === 201) {
        alert("Account created successfully");
        setCaptain(res.data.user);
        localStorage.setItem("captain-token", res.data.token);
        navigate("/captain-home");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
    }

    console.log("Registration attempted:", userData);

    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleType("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Captain Account
          </h2>

          <div className="flex mb-4 space-x-2">
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                           leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                           leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                         leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                         leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehicleType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                       leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehicleColor"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Vehicle Color
            </label>
            <input
              type="text"
              id="vehicleColor"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Enter vehicle color"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                       leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehiclePlate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Vehicle Plate Number
            </label>
            <input
              type="text"
              id="vehiclePlate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Enter vehicle plate number"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                       leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="vehicleCapacity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Vehicle Capacity
            </label>
            <input
              type="number"
              id="vehicleCapacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Enter vehicle capacity"
              required
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                       leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 
                         rounded focus:outline-none focus:shadow-outline transition duration-300 w-full"
            >
              Register
            </button>

            <Link
              to="/captain-login"
              type="button"
              className="text-center mb-10 mt-1 text-sm"
            >
              <span>Already have an account?</span>{" "}
              <span className="text-blue-400">Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
