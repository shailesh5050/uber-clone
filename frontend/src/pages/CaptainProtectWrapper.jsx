import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("captain-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default CaptainProtectWrapper;
