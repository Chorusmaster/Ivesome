import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN! as SignOptions["expiresIn"],
};