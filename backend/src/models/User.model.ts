import { Schema, model } from "mongoose";
import { UserRole, UserStatus } from "../features/user/user.types.js";

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
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.USER,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      required: true,
      default: UserStatus.UNVERIFIED,
    }
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);