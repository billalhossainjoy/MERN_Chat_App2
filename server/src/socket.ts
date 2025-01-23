import { Server } from "socket.io";
import http from "http";

function connectSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL!],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  const userSocketMap: Record<string, string> = {};

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id); // TODO: Remove before deploy

    const userId = socket.handshake.query.userId;
    console.log(userId);
    if (userId) userSocketMap[userId as string] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id); // TODO: Remove before deploy
      delete userSocketMap[userId as string];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    return io;
  });
}

export default connectSocket;
