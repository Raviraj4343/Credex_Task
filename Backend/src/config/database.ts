import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  await mongoose.connect(env.MONGODB_URL, {
    serverSelectionTimeoutMS: 10000
  });

  isConnected = true;
  logger.info("MongoDB connected");
};
