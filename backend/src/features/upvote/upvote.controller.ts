import type { Request, Response } from "express";
import { ApiError } from "../../types/error.types.js";
import { getUpvote, toggleUpvote } from "./upvote.service.js";

export async function getUpvoteHandler(req: Request, res: Response) {
  if (!req.params.projectId || typeof req.params.projectId !== "string") {
    throw new ApiError(422, "Invalid project id");
  }
  const projectId = req.params.projectId;
  res.json(await getUpvote(req.user.id, req.params.projectId));
}

export async function toggleUpvoteHandler(req: Request, res: Response) {
  if (!req.params.projectId || typeof req.params.projectId !== "string") {
    throw new ApiError(422, "Invalid project id");
  }
  const projectId = req.params.projectId;
  res.json(await toggleUpvote(req.user.id, req.params.projectId));
}