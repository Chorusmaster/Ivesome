import { generateToken, verifyToken } from "../../utils/jwt.js";
import { env } from "../../config/env.js";
import { accessJwtSchema, refreshJwtSchema } from "./jwt.schema.js";
import { ApiError } from "../../types/error.types.js";

export function generateAccessToken(userId: string, role: string) {
  return generateToken(
    {
      sub: userId,
      role,
      type: "access",
    },
    env.accessJwtExpiresIn ?? "25m"
  );
}

export function generateRefreshToken(userId: string, jti: string) {
  return generateToken(
    {
      sub: userId,
      jti: jti,
      type: "refresh",
    },
    env.refreshJwtExpiresIn ?? "7d"
  );
}

export function verifyAccessToken(token: string) {
  const payload = verifyToken(token);

  const payloadCheckResult = accessJwtSchema.safeParse(payload);
    
  if (!payloadCheckResult.success) {
    throw new ApiError(401, "Invalid refresh token");
  }

  return payloadCheckResult.data;
}

export function verifyRefreshToken(token: string) {
  const payload = verifyToken(token);

  const payloadCheckResult = refreshJwtSchema.safeParse(payload);
    
  if (!payloadCheckResult.success) {
    throw new ApiError(401, "Invalid refresh token");
  }

  return payloadCheckResult.data;
}

