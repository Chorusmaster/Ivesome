import type { Request, Response } from "express";
import { updateProfile, getUser, updateUserStatus } from "./user.service.js";
import { getParam } from "../../utils/validation.js";
import { ApiError } from "../../types/error.types.js";

export async function updateProfileHandler(req: Request, res: Response) {
  const imageUrl = req.file
    ? `/uploads/images/${req.file.filename}`
    : undefined;

  const result = await updateProfile(req.user.id, req.body, imageUrl);

  res.json(result);
}

export async function getUserHandler(req: Request, res: Response) {
  res.json(await getUser(getParam(req.params.id, "user id")));
}

export async function updateUserStatusHandler(req: Request, res: Response) {
  const userId = getParam(req.params.userId, "user id");
  const status = req.body.status;

  if (status !== "ACTIVE" && status !== "BLOCKED") {
    throw new ApiError(422, "Invalid user status to change to");
  }

  res.json(await updateUserStatus(userId, status));
}
