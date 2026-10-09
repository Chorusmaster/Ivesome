import type { Request, Response } from "express";
import { ApiError } from "../../types/error.types.js";
import { getSkills, getTags } from "./taxonomy.service.js";

function getSearchQuery(value: unknown, name: string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    throw new ApiError(422, `Invalid ${name} search`);
  }
  return value;
}

export async function getSkillsHandler(req: Request, res: Response) {
  res.json(await getSkills(getSearchQuery(req.query.search, "skills")));
}

export async function getTagsHandler(req: Request, res: Response) {
  res.json(await getTags(getSearchQuery(req.query.search, "tags")));
}
