import { RefreshSession } from "../../models/RefreshSession.model.js";
import { EmailVerificationToken, type IEmailVerificationToken } from "../../models/EmailVerificationToken.model.js";
import type { IRefreshSession } from "../../models/RefreshSession.model.js";
import { env } from "../../config/env.js";
import crypto from "node:crypto";
import { randomUUID } from "node:crypto";
import { Types, type HydratedDocument } from "mongoose";
import { updateUserStatusWithSession } from "../user/user.repository.js";
import { UserStatus } from "../user/user.types.js";
import mongoose from "mongoose";

export function createRefreshSessionId() {
  return randomUUID();
}

export async function createRefreshSession(
  sessionId: string,
  userId: string,
  token: string,
): Promise<HydratedDocument<IRefreshSession>> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + env.refreshExpirationTime);

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return RefreshSession.create({
    _id: sessionId,
    userId,
    tokenHash,
    expiresAt,
  });
}

export async function getRefreshSessionById(
  id: string,
): Promise<HydratedDocument<IRefreshSession> | null> {
  return RefreshSession.findById(id);
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

export async function createEmailVerificationToken(userId: string, tokenHash: string): Promise<HydratedDocument<IEmailVerificationToken> | null> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + env.emailVerificationExpirationTime);

  return EmailVerificationToken.create({
    userId: new Types.ObjectId(userId),
    tokenHash,
    expiresAt: expiresAt,
  });
}

export async function getValidEmailVerificationToken(userId: string): Promise<HydratedDocument<IEmailVerificationToken> | null> {
  return await EmailVerificationToken.findOne({
    userId,
    expiresAt: { $gt: new Date() },
    usedAt: null,
  });
}

export async function invalidateEmailVerificationToken(tokenId: string) {
  return EmailVerificationToken.findByIdAndDelete(tokenId);
}

export async function completeEmailVerification(userId: string, tokenId: string) {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await updateUserStatusWithSession(userId, UserStatus.ACTIVE, session);
      await EmailVerificationToken.findByIdAndDelete(tokenId, { session });
    });
  } finally {
    await session.endSession();
  }
}