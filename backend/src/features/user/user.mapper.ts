import type { IUser } from "../../models/User.model.js";
import type { HydratedDocument } from "mongoose";
import type { UserData } from "./user.types.js";

/**
 * Converts User model type to UserData object
 */
export function toUserData(
  user: HydratedDocument<IUser>
): UserData {
  return {
    id: user._id.toString(),
    email: user.email,
    passwordHash: user.passwordHash,
    role: user.role,
    isBlocked: user.isBlocked,
  };
}