import { Schema, model, Types } from "mongoose";
import type { AuthTokenType } from "../features/auth/auth.types.js";

export interface IAuthToken {
  userId: Types.ObjectId;
  tokenHash: string;
  type: AuthTokenType;
  expiresAt: Date;
  usedAt?: Date | null;
}

const authTokenSchema = new Schema<IAuthToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    usedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const AuthToken = model<IAuthToken>(
  "AuthToken",
  authTokenSchema
);
