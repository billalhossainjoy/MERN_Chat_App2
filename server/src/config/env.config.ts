import dotenv from "dotenv";
dotenv.config();

const env = {
  MONGO_URI: process.env.MONGO_URI!,
  JWT_TOKEN: process.env.JWT_TOKEN!,
  JWT_EXPIRY: process.env.JWT_EXPIRY!,
  CLOUDINARY_API_NAME: process.env.CLOUDINARY_API_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};

export const {
  MONGO_URI,
  JWT_TOKEN,
  JWT_EXPIRY,
  CLOUDINARY_API_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = env;
