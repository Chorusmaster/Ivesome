import { Schema, model } from "mongoose";
import { IdeaVisibility, IdeaStatus } from "../features/idea/idea.types.js";
import { Types } from "mongoose";

export interface IIdea {
  authorId: Types.ObjectId,
  title: string,
  shortDescription: string,
  fullDescription?: string,
  visibility: IdeaVisibility,
  status: IdeaStatus,
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

export const Idea = model<IIdea>("Idea", ideaSchema);