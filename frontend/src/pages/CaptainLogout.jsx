import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("captain-token")
    ? JSON.parse(localStorage.getItem("captain-token"))
    : null;

  async function logout() {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/logout`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setUser({
          fullname: {
            firstname: "",
            lastname: "",
          },
          email: "",
        });
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.log("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={logout} disabled={loading}>
        {loading ? "Logging Out..." : "Logout"}
      </button>
    </div>
  );
};

export default UserLogout;
