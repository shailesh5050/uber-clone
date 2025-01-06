import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CaptainContextData = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("captain-token");
    if (token) {
      const fetchCaptainProfile = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/captain/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCaptain(response.data.captain);
        } catch (error) {
          setError("Error fetching captain profile");
        }
      };
      fetchCaptainProfile();
    }
  }, []);

  return (
    <CaptainContextData.Provider value={{ captain, setCaptain, error }}>
      {children}
    </CaptainContextData.Provider>
  );
};

export const useCaptainData = () => {
  const context = useContext(CaptainContextData);
  if (!context) {
    throw new Error("useCaptainData must be used within a CaptainProvider");
  }
  return context;
};

export default CaptainContext;
