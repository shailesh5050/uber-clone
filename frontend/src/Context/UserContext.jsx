import React from "react";
import { createContext, useState } from "react";
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
    <UserContextData.Provider value={[user, setUser]}>
      {children}
    </UserContextData.Provider>
  );
};

export default UserContext;
