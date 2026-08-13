import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  console.log(env)

  try {
    await mongoose.connect(env.databaseUrl);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log("MongoDB disconnected");
}