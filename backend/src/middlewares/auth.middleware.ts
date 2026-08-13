import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../features/auth/auth.tokens.js";

export function authenticate(
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
    
    const payload = verifyAccessToken(accessToken)

    req.user = payload;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}