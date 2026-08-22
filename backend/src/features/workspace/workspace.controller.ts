import type { Request, Response } from "express";
import { getParam } from "../../utils/validation.js";
import { getWorkspace } from "./workspace.service.js";

export async function getWorkspaceHandler(req: Request, res: Response) {
  res.json(
    await getWorkspace(
      getParam(req.params.workspaceId, "workspace id"),
      req.user.id,
    ),
  );
}