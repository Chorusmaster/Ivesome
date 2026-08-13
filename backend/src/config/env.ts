import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

dotenv.config();

export const env = {
  port: requiredEnv("PORT") || 5000,
  databaseUrl: requiredEnv("DATABASE_URL"),
  jwtSecret: requiredEnv("JWT_SECRET"),
  jwtExpiresIn: requiredEnv("JWT_EXPIRES_IN") as SignOptions["expiresIn"],
};