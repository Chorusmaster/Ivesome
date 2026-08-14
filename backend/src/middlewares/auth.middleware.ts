import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../features/auth/auth.tokens.js";
import { getUserAuthStatus } from "../features/user/user.repository.js";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    
    const payload = verifyAccessToken(accessToken);
    const statusObj = await getUserAuthStatus(payload.sub);

    if (!statusObj?.status || statusObj.status == "BLOCKED") {
      return res.status(401).json({
        message: "Your account is blocked",
      });
    }

    req.user = {
      id: payload.sub,
      role: payload.role,
      status: statusObj.status,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}