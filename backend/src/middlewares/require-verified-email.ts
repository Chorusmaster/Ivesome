import type { Request, Response, NextFunction } from "express";

export function requireVerifiedEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(500).json({
      message: "Authentication middleware must run first",
    });
  }

  if (req.user.status === "UNVERIFIED") {
    return res.status(403).json({
      message: "Unverified email",
    });
  }

  next();
}