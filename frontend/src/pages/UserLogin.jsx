import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../Context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        toast.success("Login successful!", {
          duration: 4000,
          position: "bottom-center",
        });
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        toast.error(res.data.message || "Login failed", {
          duration: 4000,
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        duration: 4000,
        position: "bottom-center",
      });
    }

    console.log("Login attempted");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="min-h-screen-safe flex items-center justify-center bg-gray-100 spacing-responsive-x pt-safe pb-safe">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl spacing-responsive mb-4"
        >
          <h2 className="text-responsive-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            Login
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
              type="submit"
              className="btn-touch bg-black text-white font-bold py-3 sm:py-4 px-4 
                         rounded-lg focus:outline-none focus:shadow-outline transition duration-300 w-full
                         hover:bg-gray-800 active:scale-95 text-responsive-base"
            >
              Sign In
            </button>
            
            <Link to="/signup" className="styled-link">
              <span className="text-gray-600">New Here?</span>{" "}
              <span className="text-blue-500 font-medium hover:text-blue-600">Create Account</span>
            </Link>

            <Link
              to="/captain-login"
              className="btn-touch bg-green-600 flex justify-center items-center text-white py-3 sm:py-4 px-4 
                         rounded-lg focus:outline-none focus:shadow-outline transition duration-300 w-full
                         hover:bg-green-700 active:scale-95 text-responsive-base font-medium"
            >
              Sign In As Captain
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;

/* Add this CSS to your global stylesheet or in a CSS module */
<style>
  {`
    .styled-link {
      display: block;
      text-align: center;
      font-size: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  `}
</style>
