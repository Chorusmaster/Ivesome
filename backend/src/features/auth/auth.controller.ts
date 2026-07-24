import type { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service.js";
import { JWT_COOKIE_MAX_AGE } from "../../config/jwt.js";

export async function login(
  req: Request,
  res: Response
) {
  const result = await loginUser(
    req.body.email,
    req.body.password
  );

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: false, //true for production
    sameSite: "lax", //Block some authomatic cross-site requests for sequrity reasons
    maxAge: JWT_COOKIE_MAX_AGE,
  });

  res.json(result);
}

export async function register(
  req: Request,
  res: Response
) {
  const result = await registerUser(
    req.body.email,
    req.body.password
  );

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: false, //true for production
    sameSite: "strict",
    maxAge: JWT_COOKIE_MAX_AGE,
  });

  res.json(result);
}

export const profile = (req: Request, res: Response) => {
  res.status(204).json(req.user);
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");

  res.json({
    message: "Logged out",
  });
};
