import type { HydratedDocument } from "mongoose";
import type { IRefreshSession } from "../../models/RefreshSession.model.js";
import type { RefreshSessionData } from "./refresh-session.types.js";

/**
 * Converts RefreshSession model type to RefreshSessionData object
 */
export function toRefreshSessionData(
  session: HydratedDocument<IRefreshSession>
): RefreshSessionData {
  return {
    id: session._id.toString(),
    userId: session.userId.toString(),
    tokenHash: session.tokenHash,
    expiresAt: session.expiresAt,
    revokedAt: session.revokedAt ?? null,
  };
}
