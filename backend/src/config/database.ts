import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  console.log(env)

  try {
    await mongoose.connect(env.mongoUri);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
}