import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../Context/UserContext";
import axios from "axios";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useUserData();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add login logic here

    const userDataObj = { email, password };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        userDataObj
      );

      if (res.status === 200) {
        alert("Login successfully");
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
    }

    console.log("Login attempted:", userData);
    setPassword("");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

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

          <div className="mb-6">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                         mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 
                         rounded focus:outline-none focus:shadow-outline transition duration-300 w-full"
            >
              Sign In
            </button>
            <Link to="/signup" className="text-center mb-10 mt-1">
              <span>New Here ?</span>{" "}
              <span className="text-blue-400">Create Account</span>
            </Link>

            <Link
              to="/captain-login"
              type="submit"
              className="bg-green-600 flex justify-center items-center text-white  py-2 px-4 
                         rounded focus:outline-none focus:shadow-outline transition duration-300 w-full"
            >
              Sign In As Captain
            </Link>

            {/* <a
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-black-500 
                         hover:text-blue-800"
            >
              SignUp
            </a> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
