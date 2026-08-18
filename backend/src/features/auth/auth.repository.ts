import { env } from "../../config/env.js";
import { prisma } from "../../config/database.js";
import crypto from "node:crypto";
import {
  updateUserStatusWithSession,
  updateUser,
} from "../user/user.repository.js";
import type { AuthTokenType } from "./auth.types.js";
import type { UpdateUserData } from "../user/user.types.js";

export async function createRefreshSession(
  jti: string,
  userId: string,
  token: string,
) {
  const expiresAt = new Date(Date.now() + env.refreshExpirationTime);
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  return prisma.refreshSession.create({
    data: {
      jti,
      userId,
      tokenHash,
      expiresAt,
    },
  });
}

export async function getRefreshSessionByJti(jti: string) {
  return prisma.refreshSession.findUnique({ where: { jti } });
}

export async function revokeRefreshSession(id: string) {
  return prisma.refreshSession.update({
    where: { id },
    data: { revokedAt: new Date() },
  });
}

export async function revokeAllUserSessions(userId: string) {
  return prisma.refreshSession.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function createAuthToken(
  userId: string,
  tokenHash: string,
  type: AuthTokenType,
  expirationTime: number,
) {
  const expiresAt = new Date(Date.now() + expirationTime);

  return prisma.authToken.create({
    data: {
      userId,
      tokenHash,
      type,
      expiresAt,
    },
  });
}

export async function getValidAuthToken(userId: string, type: AuthTokenType) {
  return prisma.authToken.findFirst({
    where: {
      userId,
      expiresAt: { gt: new Date() },
      type,
      usedAt: null,
    },
  });
}

export async function deleteValidAuthToken(
  userId: string,
  type: AuthTokenType,
) {
  const token = await prisma.authToken.findFirst({
    where: {
      userId,
      expiresAt: { gt: new Date() },
      type,
      usedAt: null,
    },
  });

  if (!token) return null;

  return prisma.authToken.delete({ where: { id: token.id } });
}

export async function completeTokenResend(
  userId: string,
  type: AuthTokenType,
  tokenHash: string,
) {
  return prisma.$transaction(async (tx) => {
    await tx.authToken.deleteMany({
      where: {
        userId,
        type,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    await tx.authToken.create({
      data: {
        userId,
        tokenHash,
        type,
        expiresAt: new Date(Date.now() + env.emailVerificationExpirationTime),
      },
    });
  });
}

export async function completeEmailVerification(
  userId: string,
  tokenId: string,
) {
  return prisma.$transaction(async (tx) => {
    await updateUserStatusWithSession(userId, "ACTIVE", tx);
    await tx.authToken.delete({ where: { id: tokenId } });
  });
}

export async function findAuthTokenByHash(
  tokenHash: string,
  type: AuthTokenType,
) {
  return prisma.authToken.findFirst({ where: { tokenHash, type } });
}

export async function completePasswordChange(
  userId: string,
  passwordHash: string,
  tokenId: string,
) {
  return prisma.$transaction(async (tx) => {
    await updateUser(userId, { passwordHash: passwordHash }, tx);
    await tx.authToken.delete({ where: { id: tokenId } });
  });
}
