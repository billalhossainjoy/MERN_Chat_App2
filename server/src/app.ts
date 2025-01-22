import express from "express";
import http from "http";
import { DefaultErrorHandler, NotFoundHandler } from "./lib/ErrorHandler";
import cors from "cors";
import authRouter from "./router/auth.router";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.router";
import messageRouter from "./router/message.router";

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL!],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const server = http.createServer(app);

// Middleware
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// Not found handler
app.use(NotFoundHandler);

// default error handler
app.use(DefaultErrorHandler);

export default server;
