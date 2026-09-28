import type { Request, Response } from "express";
import { getSettings, updateSettings } from "./settings.service.js";

export async function getSettingsHandler(req: Request, res: Response) {
  res.json(await getSettings(req.user.id));
}

export async function updateSettingsHandler(req: Request, res: Response) {
  res.json(await updateSettings(req.user.id, req.body));
}