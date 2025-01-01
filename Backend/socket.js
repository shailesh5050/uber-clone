import { Server } from "socket.io";
import UserModel from "./models/user.model.js";
import CaptainModel from "./models/captain.model.js";
let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", async (data) => {
      console.log("User joined:", data);
      const { userId, isCaptain } = data;
      if (isCaptain) {
        const captain = await CaptainModel.findById(userId);
        if (captain) {
          const oldSocketId = captain.socketId;
          captain.socketId = socket.id;
          await captain.save();
          console.log(`Updated captain ${userId} socket ID from ${oldSocketId} to ${socket.id}`);
        }
      } else {
        const user = await UserModel.findById(userId);
        if (user) {
          const oldSocketId = user.socketId;
          user.socketId = socket.id;
          await user.save();
          console.log(`Updated user ${userId} socket ID from ${oldSocketId} to ${socket.id}`);
        }
      }
    });

    socket.on("update-location-captain", async (data) => {
      console.log("User updated location:", data);
      const { userId, location } = data;
      //validate location
      if (!location || !location.ltd || !location.lng) {

        return socket.emit("error", "Location is invalid");
      }
      try {
        const res = await CaptainModel.findByIdAndUpdate(
          userId,
          {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
          },
          { new: true }
        );
      } catch (error) {
        throw new Error("Error updating captain location:", error);
       
      }
    });
    

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });

    // ...additional socket event handlers...
  });
}

export function sendMessageToSocketId(socketId, message) {
  if (io) {
    console.log("Sending message to socket:", socketId, "Message:", message);
    if (message.event) {
      io.to(socketId).emit(message.event, message.data);
    } else {
      io.to(socketId).emit("message", message);
    }
  } else {
    console.error("Socket.io is not initialized.");
  }
}
