import dotenv from "dotenv";
dotenv.config();

const env = {
  MONGO_URI: process.env.MONGO_URI!,
  JWT_TOKEN: process.env.JWT_TOKEN!,
  JWT_EXPIRY: process.env.JWT_EXPIRY!,
};

export const { MONGO_URI, JWT_TOKEN, JWT_EXPIRY } = env;
