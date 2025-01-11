import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserData } from "../Context/UserContext";
import toast from "react-hot-toast";

const UserRegister = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser } = useUserData();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        duration: 4000,
        position: "bottom-center"
      });
      return;
    }

    // Registration logic
    const userDataObj = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        userDataObj
      );

      if (res.status === 201) {
        toast.success("Account created successfully!", {
          duration: 4000,
          position: "bottom-center"
        });
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        navigate("/login");
      } else {
        toast.error(res.data.message || "Registration failed", {
          duration: 4000,
          position: "bottom-center"
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        duration: 4000,
      });
    }

    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Account
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

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              minLength={6}
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
              Register
            </button>

            <Link
              to="/login"
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

export default UserRegister;
