import  { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_BASE_URL); // replace with your server URL

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = (eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
    } else {
      console.error("Socket not connected");
    }
  };

  const joinRoom = (userId, isCaptain = false) => {
    if (socket) {
      socket.emit("join", { userId, isCaptain });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, joinRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default SocketProvider;
