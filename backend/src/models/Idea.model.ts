import { Schema, model } from "mongoose";
import { IdeaVisibility, IdeaStatus } from "../features/idea/idea.types.js";

const ideaSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    fullDescription: {
      type: String,
      required: false,
    },

    visibility: {
      type: String,
      enum: Object.values(IdeaVisibility),
      required: true,
      default: IdeaVisibility.PRIVATE,
    },

    status: {
      type: String,
      enum: Object.values(IdeaStatus),
      required: true,
      default: IdeaStatus.DRAFT,
    },
  },
  {
    timestamps: true,
  }
);

export const Idea = model("Idea", ideaSchema);