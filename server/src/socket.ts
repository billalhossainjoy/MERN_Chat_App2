import {  Server } from "socket.io";
import http from "http";

const userSocketMap: Record<string, string> = {};

export const getReciverSocketId = (userId : string) => {
  return userSocketMap[userId]
}

function connectSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL!],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });


  io.on("connection", (socket) => {

    const userId = socket.handshake.query.userId;
    console.log(userId);
    if (userId) userSocketMap[userId as string] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      delete userSocketMap[userId as string];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
  return io;
}

export default connectSocket;
