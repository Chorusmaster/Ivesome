import { Schema, model, Types } from "mongoose";

export interface IRefreshSession {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date | null;
}

const refreshSessionSchema = new Schema<IRefreshSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    tokenHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    revokedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const RefreshSession = model<IRefreshSession>("RefreshSession", refreshSessionSchema);