import { Schema, model } from "mongoose";
import {
  IDEA_VISIBILITY_VALUES,
  IDEA_STATUS_VALUES,
} from "../features/idea/idea.types.js";
import type {
  IdeaVisibility,
  IdeaStatus,
} from "../features/idea/idea.types.js";
import { Types } from "mongoose";

export interface IIdea {
  authorId: Types.ObjectId;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  visibility: IdeaVisibility;
  status: IdeaStatus;
}

const ideaSchema = new Schema<IIdea>(
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
      enum: IDEA_VISIBILITY_VALUES,
      required: true,
      default: "PRIVATE",
    },

    status: {
      type: String,
      enum: IDEA_STATUS_VALUES,
      required: true,
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  },
);

export const Idea = model<IIdea>("Idea", ideaSchema);
