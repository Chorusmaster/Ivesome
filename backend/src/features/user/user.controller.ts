import type { Request, Response } from "express";
import { updateProfile } from "./user.service.js";

export async function updateProfileHandler(req: Request, res: Response) {
  const imageUrl = req.file
    ? `/uploads/images/${req.file.filename}`
    : undefined;

  console.log("body:", req.body);
  console.log("file:", req.file);

  const result = await updateProfile(req.user.id, req.body, imageUrl);

  res.json(result);
}
