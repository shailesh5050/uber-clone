import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCaptainData } from "../Context/CaptainContext";
import toast, { Toaster } from 'react-hot-toast';

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCaptain } = useCaptainData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add login logic here
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("captain-token", response.data.token);
        setCaptain(response.data.captain);
        setIsLoggedIn(true);
        navigate("/captain-home");
       // toast.success("Login successful!");
        
        navigate("/captain-home");
      }
    } catch (error) {
       toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
      setPassword("");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen-safe flex items-center justify-center bg-gray-100 spacing-responsive-x pt-safe pb-safe">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl spacing-responsive mb-4"
        >
          <h2 className="text-responsive-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            Captain Login
          </h2>

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

          <div className="mb-6 sm:mb-8">
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
              className="btn-touch shadow appearance-none border rounded-lg w-full py-3 sm:py-4 px-4 text-gray-700 
                         leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent text-responsive-base"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              disabled={loading}
              type="submit"
              className="btn-touch bg-black text-white font-bold py-3 sm:py-4 px-4 
                         rounded-lg focus:outline-none focus:shadow-outline transition duration-300 w-full
                         hover:bg-gray-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-responsive-base"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            
            <Link to="/captain-signup" className="text-center text-responsive-sm">
              <span className="text-gray-600">Join a Fleet?</span>{" "}
              <span className="text-blue-500 font-medium hover:text-blue-600">Create Account</span>
            </Link>

            <Link
              to="/login"
              className="btn-touch bg-green-600 flex justify-center items-center text-white py-3 sm:py-4 px-4 
                         rounded-lg focus:outline-none focus:shadow-outline transition duration-300 w-full
                         hover:bg-green-700 active:scale-95 text-responsive-base font-medium"
            >
              Sign In As User
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptainLogin;
