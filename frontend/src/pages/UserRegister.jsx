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
    <div className="min-h-screen-safe flex items-center justify-center bg-gray-100 spacing-responsive-x pt-safe pb-safe">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl spacing-responsive mb-4"
        >
          <h2 className="text-responsive-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            Create Account
          </h2>

          <div className="flex flex-col sm:flex-row mb-4 sm:mb-6 space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="w-full sm:w-1/2">
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-responsive-sm font-bold mb-2"
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
                className="btn-touch shadow appearance-none border rounded-lg w-full py-3 sm:py-4 px-4 text-gray-700 
                           leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent text-responsive-base"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-responsive-sm font-bold mb-2"
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
                className="btn-touch shadow appearance-none border rounded-lg w-full py-3 sm:py-4 px-4 text-gray-700 
                           leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent text-responsive-base"
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-responsive-sm font-bold mb-2"
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
              className="btn-touch shadow appearance-none border rounded-lg w-full py-3 sm:py-4 px-4 text-gray-700 
                         leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent text-responsive-base"
            />
          </div>

          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-responsive-sm font-bold mb-2"
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
              className="btn-touch shadow appearance-none border rounded-lg w-full py-3 sm:py-4 px-4 text-gray-700 
                         leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent text-responsive-base"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-responsive-sm font-bold mb-2"
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
              className="btn-touch shadow appearance-none border rounded-lg w-full py-3 sm:py-4 px-4 text-gray-700 
                         leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent text-responsive-base"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="btn-touch bg-black text-white font-bold py-3 sm:py-4 px-4 
                         rounded-lg focus:outline-none focus:shadow-outline transition duration-300 w-full
                         hover:bg-gray-800 active:scale-95 text-responsive-base"
            >
              Register
            </button>

            <Link
              to="/login"
              className="text-center text-responsive-sm"
            >
              <span className="text-gray-600">Already have an account?</span>{" "}
              <span className="text-blue-500 font-medium hover:text-blue-600">Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
