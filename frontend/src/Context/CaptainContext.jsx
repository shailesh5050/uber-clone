import React from "react";
import { createContext, useContext, useState } from "react";

export const CaptainContextData = createContext();
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
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
