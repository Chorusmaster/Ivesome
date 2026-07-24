import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/error.types.js";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors ?? []
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal server error"
  });
};