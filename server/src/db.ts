import mongoose from "mongoose";
import { MONGO_URI } from "./config/env.config";

const ConnectMongo = async (): Promise<mongoose.Mongoose> => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    return connection;
  } catch (error) {
    throw error;
  }
};

export default ConnectMongo;
