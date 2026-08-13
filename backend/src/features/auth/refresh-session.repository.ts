import { RefreshSession } from "../../models/RefreshSession.model.js";
import { env } from "../../config/env.js";
import crypto from "node:crypto";
import { randomUUID } from "node:crypto";
import type { RefreshSessionData } from "./refresh-session.types.js";
import { toRefreshSessionData } from "./refresh-session.mapper.js";

export function createRefreshSessionId() {
  return randomUUID();
}

export async function createRefreshSession(
  sessionId: string,
  userId: string,
  token: string,
): Promise<RefreshSessionData> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + env.refreshExpirationTime);

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const session = await RefreshSession.create({
    _id: sessionId,
    userId,
    tokenHash,
    expiresAt,
  });

  return toRefreshSessionData(session);
}

export async function getRefreshSessionById(
  id: string,
): Promise<RefreshSessionData | null> {
  const session = await RefreshSession.findById(id);

  if (!session) return null;

  return toRefreshSessionData(session);
}

export async function revokeRefreshSession(id: string) {
  const session = await RefreshSession.findByIdAndUpdate(
    id,
    {
      $set: {
        revokedAt: new Date(),
      },
    },
    { new: true }
  );

  return session ? toRefreshSessionData(session) : null;
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
    }
  );
}
