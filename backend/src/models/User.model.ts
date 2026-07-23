import { Schema, model } from "mongoose";
import { UserRole } from "../features/auth/auth.types.js";

const userSchema = new Schema(
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
      required: false,
      default: UserRole.USER,
    },

    isBlocked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);