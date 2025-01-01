import React from "react";
import { createContext,useEffect, useContext, useState } from "react";
import axios from "axios";
export const CaptainContextData = createContext();
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("captain-token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("User profile:", response.data.captain);
          setCaptain(response.data.captain);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);
  return (
    <CaptainContextData.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContextData.Provider>
  );
};

export function useCaptainData() {
  const context = useContext(CaptainContextData);
  if (context === undefined) {
    throw new Error("use Captain must be used within a CaptainProvider");
  }
  return context;
}

export default CaptainContext;
