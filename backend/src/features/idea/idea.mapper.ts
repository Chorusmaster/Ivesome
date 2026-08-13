import type { IIdea } from "../../models/Idea.model.js";
import type { HydratedDocument } from "mongoose";
import type { IdeaData } from "./idea.types.js";

/**
 * Converts Idea model type to IdeaData object
 */
export function toIdeaData(
  idea: HydratedDocument<IIdea>
): IdeaData {
  return {
    id: idea._id.toString(),
    authorId: idea.authorId.toString(),
    title: idea.title,
    shortDescription: idea.shortDescription,
    fullDescription: idea.fullDescription,
    visibility: idea.visibility,
    status: idea.status,
  };
}