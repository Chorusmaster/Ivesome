import { Schema, model, Types } from "mongoose";

export interface IEmailVerificationToken {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  usedAt?: Date | null;
}

const emailVerificationTokenSchema = new Schema<IEmailVerificationToken>(
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

export const EmailVerificationToken = model<IEmailVerificationToken>(
  "EmailVerificationToken",
  emailVerificationTokenSchema
);
