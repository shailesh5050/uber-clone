import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
export const UserContextData = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("User profile:", response.data.user);
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);
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
