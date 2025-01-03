import express from "express";
import http from "http";
import { DefaultErrorHandler, NotFoundHandler } from "./lib/ErrorHandler";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URI!],
    credentials: true,
  })
);

const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Not found handler
app.use(NotFoundHandler);

// default error handler
app.use(DefaultErrorHandler);

export default server;
