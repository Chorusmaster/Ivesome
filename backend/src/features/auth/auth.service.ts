import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./auth.tokens.js";
import { ApiError } from "../../types/error.types.js";
import crypto from "node:crypto";
import type { IUser } from "../../models/User.model.js";
import type { HydratedDocument } from "mongoose";
import { createAuthToken, encryptAuthToken, verifyAuthToken } from "../../utils/auth-token.js";
import { sendVerificationEmail } from "../email/email.servise.js";
import { 
  completeEmailVerification, 
  completePasswordChange, 
  createAuthToken as createAuthTokenDocument, 
  getValidAuthToken,
  findAuthTokenByHash
} from "./auth.repository.js";
import { env } from "../../config/env.js";

import {
  getUserById,
  getUserByEmail,
  createUser,
} from "../user/user.repository.js";
import {
  createRefreshSession,
  getRefreshSessionByJti,
  revokeRefreshSession,
} from "./auth.repository.js";
import { randomUUID } from "node:crypto";

async function createAuthSession(user: HydratedDocument<IUser>) {
  const userId = user._id.toString();

  const accessToken = generateAccessToken(
    userId,
    user.role
  );

  const jti = randomUUID();

  const refreshToken = generateRefreshToken(
    userId,
    jti
  );

  await createRefreshSession(
    jti,
    userId,
    refreshToken
  );

  return {
    accessToken,
    refreshToken,
  };
}

export async function registerUser(
  email: string,
  password: string,
) {
  if (await getUserByEmail(email)) {
    throw new ApiError(409, "Validation failed", {email: 'User with this email already exist'});
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await createUser(email, passwordHash);

  const verificationToken = createAuthToken();
  const hashedVerificationToken = encryptAuthToken(verificationToken);

  await createAuthTokenDocument(
    user._id.toString(),
    hashedVerificationToken,
    "EMAIL_VERIFICATION",
    env.emailVerificationExpirationTime
  );

  await sendVerificationEmail(email, verificationToken);

  const { accessToken, refreshToken } = await createAuthSession(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
  };
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ApiError(422, "Password or email is invalid");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new ApiError(422, "Password or email is invalid");
  }

  const { accessToken, refreshToken } = await createAuthSession(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
  };
}

export async function refreshAccessToken(refreshToken: string) {
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

  const { accessToken:newAccessToken, refreshToken:newRefreshToken } = await createAuthSession(user);

  await revokeRefreshSession(
    session._id.toString()
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

export async function revokeSession(refreshToken: string) {
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

  await revokeRefreshSession(
    session._id.toString()
  );
}

export async function verifyEmail(
  userId: string,
  token: string
) {
  const storedToken = await getValidAuthToken(userId, "EMAIL_VERIFICATION");

  if (
    !storedToken ||
    !verifyAuthToken(token, storedToken.tokenHash)
  ) {
    throw new ApiError(401, "Invalid email verification token");
  }

  await completeEmailVerification(userId, storedToken._id.toString());
}

export async function createPasswordResetToken(
  email: string
) {
  const user = await getUserByEmail(email);

  if (!user) throw new ApiError(422, "User with this email does not exist")

  const resetToken = createAuthToken();
  const hashedResetToken = encryptAuthToken(resetToken);

  await createAuthTokenDocument(
    user._id.toString(),
    hashedResetToken,
    "PASSWORD_RESET",
    env.passwordResetExpirationTime
  );
}

export async function changePassword(
  password: string,
  token: string
) {
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

  await completePasswordChange(storedToken.userId.toString(), passwordHash, storedToken._id.toString());
}