import { RefreshSession } from "../../models/RefreshSession.model.js";
import {
  AuthToken,
  type IAuthToken,
} from "../../models/AuthToken.model.js";
import type { IRefreshSession } from "../../models/RefreshSession.model.js";
import { env } from "../../config/env.js";
import crypto from "node:crypto";
import { Types, type HydratedDocument } from "mongoose";
import { updateUserStatusWithSession, updateUserPassword } from "../user/user.repository.js";
import mongoose from "mongoose";
import type { AuthTokenType } from "./auth.types.js";

export async function createRefreshSession(
  jti: string,
  userId: string,
  token: string,
): Promise<HydratedDocument<IRefreshSession>> {
  const expiresAt = new Date(
    Date.now() + env.refreshExpirationTime
  );

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  return RefreshSession.create({
    jti,
    userId,
    tokenHash,
    expiresAt,
  });
}

export async function getRefreshSessionByJti(
  jti: string,
): Promise<HydratedDocument<IRefreshSession> | null> {
  return RefreshSession.findOne({jti: jti});
}

export async function revokeRefreshSession(id: string) {
  return RefreshSession.findByIdAndUpdate(
    id,
    {
      $set: {
        revokedAt: new Date(),
      },
    },
    { new: true },
  );
}

export async function revokeAllUserSessions(userId: string) {
  return RefreshSession.updateMany(
    {
      userId,
      revokedAt: { $exists: false },
    },
    {
      $set: {
        revokedAt: new Date(),
      },
    },
  );
}



export async function createAuthToken(
  userId: string,
  tokenHash: string,
  type: AuthTokenType,
  expirationTime: number,
): Promise<HydratedDocument<IAuthToken> | null> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expirationTime);

  return AuthToken.create({
    userId: new Types.ObjectId(userId),
    tokenHash,
    type,
    expiresAt: expiresAt,
  });
}

export async function getValidAuthToken(
  userId: string,
  type: AuthTokenType,
): Promise<HydratedDocument<IAuthToken> | null> {
  return await AuthToken.findOne({
    userId,
    expiresAt: { $gt: new Date() },
    type,
    usedAt: null,
  });
}

export async function deleteValidAuthToken(
  userId: string,
  type: AuthTokenType,
) {
  return await AuthToken.findOneAndDelete({
    userId,
    expiresAt: { $gt: new Date() },
    type,
    usedAt: null,
  });
}

export async function completeTokenResend(
  userId: string,
  type: AuthTokenType,
  tokenHash: string,
) {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await deleteValidAuthToken(userId, type);
      await createAuthToken(
        userId.toString(),
        tokenHash,
        type,
        env.emailVerificationExpirationTime
      );
    });
  } finally {
    await session.endSession();
  }
}

export async function completeEmailVerification(
  userId: string,
  tokenId: string,
) {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await updateUserStatusWithSession(userId, "ACTIVE", session);
      await AuthToken.findByIdAndDelete(tokenId, { session });
    });
  } finally {
    await session.endSession();
  }
}

export async function findAuthTokenByHash(
  tokenHash: string,
  type: AuthTokenType,
): Promise<HydratedDocument<IAuthToken> | null> {
  const token = AuthToken.findOne({tokenHash: tokenHash, type: type});
  return token;
}

export async function completePasswordChange(
  userId: string,
  passwordHash: string,
  tokenId: string,
) {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await updateUserPassword(userId, passwordHash, session);
      await AuthToken.findByIdAndDelete(tokenId, { session });
    });
  } finally {
    await session.endSession();
  }
}