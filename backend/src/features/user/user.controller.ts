import type { Request, Response } from "express";
import { updateProfile, getUser } from "./user.service.js";
import { getParam } from "../../utils/validation.js";

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
