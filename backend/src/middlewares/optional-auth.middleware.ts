import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../features/auth/auth.tokens.js";
import { getUserAuthStatus } from "../features/user/user.repository.js";

export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next();
    }
    
    const payload = verifyAccessToken(accessToken);
    const statusObj = await getUserAuthStatus(payload.sub);

    if (!statusObj?.status || statusObj.status == "BLOCKED") {
      return next();
    }

    req.user = {
      id: payload.sub,
      role: payload.role,
      status: statusObj.status,
    };

    next();
  } catch {
    next();
  }
}