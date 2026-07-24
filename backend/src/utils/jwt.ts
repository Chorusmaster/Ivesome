import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function generateToken(userId: string, role: string) {
  return jwt.sign(
    {
      id: userId,
      role,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn ?? "25m",
    }
  );
}