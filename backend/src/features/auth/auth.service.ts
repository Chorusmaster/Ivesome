import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./auth.tokens.js";
import { ApiError } from "../../types/error.types.js";
import crypto from "node:crypto";
import type { User } from "../../generated/prisma/client.js";
import {
  createAuthToken,
  encryptAuthToken,
  verifyAuthToken,
} from "../../utils/auth-token.js";
import { sendVerificationEmail } from "../email/email.servise.js";
import {
  completeEmailVerification,
  completePasswordChange,
  createAuthToken as createAuthTokenDocument,
  getValidAuthToken,
  findAuthTokenByHash,
  completeTokenResend,
} from "./auth.repository.js";
import { env } from "../../config/env.js";
import {
  getUserById,
  getUserByEmail,
  getUserByLogin,
  createUser,
} from "../user/user.repository.js";
import {
  createRefreshSession,
  getRefreshSessionByJti,
  revokeRefreshSession,
} from "./auth.repository.js";
import { randomUUID } from "node:crypto";

async function createAuthSession(user: Pick<User, "id" | "email" | "role">) {
  const userId = user.id;

  const accessToken = generateAccessToken(userId, user.role);
  const jti = randomUUID();
  const refreshToken = generateRefreshToken(userId, jti);

  await createRefreshSession(jti, userId, refreshToken);

  return {
    accessToken,
    refreshToken,
  };
}

export async function register(login: string, email: string, password: string) {
  if (await getUserByEmail(email)) {
    throw new ApiError(409, "Validation failed", {
      email: "User with this email already exist",
    });
  }

  if (await getUserByLogin(login)) {
    throw new ApiError(409, "Validation failed", {
      login: "This login has already been taken",
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await createUser(login, email, passwordHash);

  const verificationToken = createAuthToken();
  const hashedVerificationToken = encryptAuthToken(verificationToken);

  await createAuthTokenDocument(
    user.id,
    hashedVerificationToken,
    "EMAIL_VERIFICATION",
    env.emailVerificationExpirationTime,
  );

  await sendVerificationEmail(email, "EMAIL_VERIFICATION", verificationToken);

  const { accessToken, refreshToken } = await createAuthSession(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

export async function login(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ApiError(422, "Password or email is invalid");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new ApiError(422, "Password or email is invalid");
  }

  const { accessToken, refreshToken } = await createAuthSession(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

export async function refreshToken(refreshToken: string) {
  const tokenData = verifyRefreshToken(refreshToken);

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const session = await getRefreshSessionByJti(tokenData.jti);

  if (
    tokenHash !== session?.tokenHash ||
    session?.revokedAt ||
    session.expiresAt < new Date()
  ) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await getUserById(tokenData.sub);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await createAuthSession(user);

  await revokeRefreshSession(session.id);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

export async function revoke(refreshToken: string) {
  const tokenData = verifyRefreshToken(refreshToken);

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const session = await getRefreshSessionByJti(tokenData.jti);

  if (
    tokenHash !== session?.tokenHash ||
    session?.revokedAt ||
    session.expiresAt < new Date()
  ) {
    throw new ApiError(401, "Invalid refresh token");
  }

  await revokeRefreshSession(session.id);
}

export async function verifyEmail(userId: string, token: string) {
  const storedToken = await getValidAuthToken(userId, "EMAIL_VERIFICATION");

  if (!storedToken || !verifyAuthToken(token, storedToken.tokenHash)) {
    throw new ApiError(401, "Invalid email verification token");
  }

  await completeEmailVerification(userId, storedToken.id);
}

export async function resendEmailVerificationLink(userId: string) {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(401, "Unauthorized");

  const verificationToken = createAuthToken();
  const hashedVerificationToken = encryptAuthToken(verificationToken);

  await completeTokenResend(
    user.id,
    "EMAIL_VERIFICATION",
    hashedVerificationToken,
  );
  await sendVerificationEmail(
    user.email,
    "EMAIL_VERIFICATION",
    verificationToken,
  );
}

export async function resendPasswordResetLink(email: string) {
  const user = await getUserByEmail(email);
  if (!user) throw new ApiError(401, "Unauthorized");

  const verificationToken = createAuthToken();
  const hashedVerificationToken = encryptAuthToken(verificationToken);

  await completeTokenResend(user.id, "PASSWORD_RESET", hashedVerificationToken);
  await sendVerificationEmail(user.email, "PASSWORD_RESET", verificationToken);
}

export async function startPasswordReset(email: string) {
  const user = await getUserByEmail(email);

  if (!user) throw new ApiError(422, "User with this email does not exist");

  const resetToken = createAuthToken();
  const hashedResetToken = encryptAuthToken(resetToken);

  await createAuthTokenDocument(
    user.id,
    hashedResetToken,
    "PASSWORD_RESET",
    env.passwordResetExpirationTime,
  );

  await sendVerificationEmail(email, "PASSWORD_RESET", resetToken);
}

export async function changePassword(password: string, token: string) {
  const tokenHash = encryptAuthToken(token);
  const storedToken = await findAuthTokenByHash(tokenHash, "PASSWORD_RESET");

  if (
    !storedToken ||
    storedToken.usedAt ||
    storedToken.expiresAt < new Date()
  ) {
    throw new ApiError(401, "Invalid password reset token");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await completePasswordChange(
    storedToken.userId,
    passwordHash,
    storedToken.id,
  );
}
