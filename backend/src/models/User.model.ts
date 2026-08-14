import { Schema, model } from "mongoose";
import {
  USER_ROLE_VALUES,
  USER_STATUS_VALUES,
} from "../features/user/user.types.js";
import type { UserRole, UserStatus } from "../features/user/user.types.js";

export interface IUser {
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: USER_ROLE_VALUES,
      required: true,
      default: "USER",
    },

    status: {
      type: String,
      enum: USER_STATUS_VALUES,
      required: true,
      default: "UNVERIFIED",
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
