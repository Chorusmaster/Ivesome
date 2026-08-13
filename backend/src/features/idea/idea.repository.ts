import { Idea } from "../../models/Idea.model.js";
import type { IIdea } from "../../models/Idea.model.js";
import type { CreateIdeaData } from "./idea.types.js";
import { Types, type HydratedDocument } from "mongoose";

export async function createIdeas(
  ideas: CreateIdeaData[],
): Promise<HydratedDocument<IIdea>[]> {
  return Idea.insertMany(
    ideas.map((idea) => ({
      ...idea,
      authorId: new Types.ObjectId(idea.authorId),
    })),
  );
}

export async function deleteAllIdeas() {
  return Idea.deleteMany({});
}
