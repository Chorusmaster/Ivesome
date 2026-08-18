import type { Request, Response } from "express";
import { 
  registerUser, 
  loginUser, 
  refreshAccessToken, 
  revokeSession, 
  verifyEmail as performEmailVerification,
  changePassword as performPasswordChange,
  startPasswordReset,
  resendEmailVerificationLink as performEmailVerificationLinkResend,
  resendPasswordResetLink as performPasswordResetLinkResend
} from "./auth.service.js";
import { getUser } from "../user/user.service.js";
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
    req.body.login,
    req.body.email,
    req.body.password
  );

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.json(result.user);
}

export async function me(
  req: Request, 
  res: Response
) {
  if (!req.user.id) return res.status(401).json({ message: "Unauthorized" });
  const user = await getUser(req.user.id);
  res.json(user);
};

export async function logout (
  req: Request, 
  res: Response
) {
  const token = req.cookies.refreshToken;

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
  await performEmailVerification(req.user.id, req.body.token);

  res.json({
    message: "Email verified",
  });
}

export async function resendEmailVerificationLink(
  req: Request,
  res: Response
) {
  await performEmailVerificationLinkResend(req.user.id);

  res.json({
    message: "Email resent",
  });
}

export async function resendPasswordVerificationLink(
  req: Request,
  res: Response
) {
  await performPasswordResetLinkResend(req.body.email);

  res.json({
    message: "Email resent",
  });
}

export async function forgotPassword(
  req: Request,
  res: Response
) {
  await startPasswordReset(req.body.email);

  res.json({
    message: "Password reset token send",
  });
}

export async function changePassword(
  req: Request,
  res: Response
) {
  await performPasswordChange(req.body.password, req.body.token);

  res.json({
    message: "Password successfully changed",
  });
}
