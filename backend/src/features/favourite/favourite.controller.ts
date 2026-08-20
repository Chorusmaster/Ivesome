import { getFavourite, toggleFavourite } from "./favourite.service.js";
import type { Request, Response } from "express";
import { ApiError } from "../../types/error.types.js";

export const getFavouriteHandler = async (
  req: Request,
  res: Response,
) => {
  if (!req.params.projectId || typeof req.params.projectId !== "string") {
    throw new ApiError(422, "Invalid project id");
  }

  const userId = req.user.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const favourite = await getFavourite(
    userId,
    req.params.projectId,
  );

  res.json(favourite);
};

export const toggleFavouriteHandler = async (
  req: Request,
  res: Response,
) => {
  if (!req.params.projectId || typeof req.params.projectId !== "string") {
    throw new ApiError(422, "Invalid project id");
  }

  const userId = req.user.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const favourite = await toggleFavourite(
    userId,
    req.params.projectId,
  );

  res.json(favourite);
};