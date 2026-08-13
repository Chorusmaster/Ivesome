import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { SignOptions } from "jsonwebtoken";
import { ApiError } from "../types/error.types.js";

export function generateToken(
  payload: Record<string, unknown>,
  expiresIn: NonNullable<SignOptions["expiresIn"]>
) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch {
    throw new ApiError(401, "Invalid token");
  }
}