import type { Request, Response } from "express";
import {
  register as performRegister,
  login as performLogin,
  refreshToken as performRefreshToken,
  revoke as performRevoke,
  verifyEmail,
  changePassword,
  startPasswordReset,
  resendEmailVerificationLink,
  resendPasswordResetLink,
} from "./auth.service.js";
import { getUser } from "../user/user.service.js";
import { env } from "../../config/env.js";

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
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

export async function loginHandler(req: Request, res: Response) {
  const result = await performLogin(req.body.email, req.body.password);

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.json(result.user);
}

export async function registerHandler(req: Request, res: Response) {
  const result = await performRegister(
    req.body.login,
    req.body.email,
    req.body.password,
  );

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.json(result.user);
}

export async function getMeHandler(req: Request, res: Response) {
  if (!req.user.id) return res.status(401).json({ message: "Unauthorized" });
  const user = await getUser(req.user.id);
  res.json(user);
}

export async function logoutHandler(req: Request, res: Response) {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  await performRevoke(token);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({
    message: "Logged out",
  });
}

export async function refreshHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await performRefreshToken(refreshToken);

  setAuthCookies(res, newAccessToken, newRefreshToken);

  res.json({
    message: "Session refreshed",
  });
}

export async function verifyEmailHandler(req: Request, res: Response) {
  await verifyEmail(req.user.id, req.body.token);

  res.json({
    message: "Email verified",
  });
}

export async function resendEmailVerificationLinkHandler(
  req: Request,
  res: Response,
) {
  await resendEmailVerificationLink(req.user.id);

  res.json({
    message: "Email resent",
  });
}

export async function resendPasswordResetLinkHandler(
  req: Request,
  res: Response,
) {
  await resendPasswordResetLink(req.body.email);

  res.json({
    message: "Email resent",
  });
}

export async function forgotPasswordHandler(req: Request, res: Response) {
  await startPasswordReset(req.body.email);

  res.json({
    message: "Password reset token send",
  });
}

export async function changePasswordHandler(req: Request, res: Response) {
  await changePassword(req.body.password, req.body.token);

  res.json({
    message: "Password successfully changed",
  });
}
