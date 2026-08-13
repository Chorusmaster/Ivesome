import { Idea } from "../../models/Idea.model.js";
import type { IdeaData, CreateIdeaData } from "./idea.types.js";
import { toIdeaData } from "./idea.mapper.js"; 
import { Types } from "mongoose"

export async function createIdeas(
  ideas: CreateIdeaData[]
): Promise<IdeaData[]> {
  const createdIdeas = await Idea.insertMany(
    ideas.map((idea) => ({
      ...idea,
      authorId: new Types.ObjectId(idea.authorId),
    }))
  );

  return createdIdeas.map(toIdeaData);
}

export async function deleteAllIdeas() {
  return Idea.deleteMany({});
}