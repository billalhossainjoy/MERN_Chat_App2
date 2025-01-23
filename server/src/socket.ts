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

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id); // TODO: Remove before deploy

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id); // TODO: Remove before deploy
    });
  });
}

export default connectSocket;
