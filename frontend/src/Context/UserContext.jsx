import React from "react";
import { createContext, useContext, useState } from "react";
export const UserContextData = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
  return (
    <UserContextData.Provider value={{ user, setUser }}>
      {children}
    </UserContextData.Provider>
  );
};

export function useUserData() {
  const context = useContext(UserContextData);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserContext;
