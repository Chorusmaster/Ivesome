import type { Request, Response } from "express";
import { 
  registerUser, 
  loginUser, 
  refreshAccessToken, 
  revokeSession, 
  verifyEmailVerificationToken 
} from "./auth.service.js";
import { env } from "../../config/env.js";

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
) {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: env.accessExpirationTime,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, //true for production
    sameSite: "lax", //Block some authomatic cross-site requests for sequrity reasons
    maxAge: env.refreshExpirationTime,
  });
}

export async function login(
  req: Request,
  res: Response
) {
  const result = await loginUser(
    req.body.email,
    req.body.password
  );

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.json(result.user);
}

export async function register(
  req: Request,
  res: Response
) {
  const result = await registerUser(
    req.body.email,
    req.body.password
  );

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.json(result.user);
}

export const me = (req: Request, res: Response) => {
  res.status(204).json(req.user);
};

export async function logout (
  req: Request, 
  res: Response
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  await revokeSession(token);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({
    message: "Logged out",
  });
};

export async function refresh(
  req: Request, 
  res: Response
) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const { accessToken:newAccessToken, refreshToken:newRefreshToken } = await refreshAccessToken(refreshToken);

  setAuthCookies(res, newAccessToken, newRefreshToken);

  res.json({
    message: "Session refreshed",
  });
};

export async function verifyEmail(
  req: Request,
  res: Response
) {
  const { token } = req.params;

  if (!token || typeof token !== "string") {
    return res.status(400).json({
      message: "Invalid token",
    });
  }

  await verifyEmailVerificationToken(req.user, token);

  res.json({
    message: "Email verified",
  });
}
