import { Idea } from "../../models/Idea.model.js";
import type { CreateIdeaData } from "./idea.types.js";

export async function createIdeas(ideas: CreateIdeaData[]) {
  return Idea.insertMany(ideas);
}

export async function deleteAllIdeas() {
  return Idea.deleteMany({});
}