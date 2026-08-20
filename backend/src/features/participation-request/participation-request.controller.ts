import type { Request, Response } from "express";
import { getParam } from "../../utils/validation.js";
import {
  cancelParticipationRequest,
  createParticipationRequest,
  listMyRequests,
  listProjectRequests,
  updateParticipationRequest,
} from "./participation-request.service.js";

export async function createParticipationRequestHandler(req: Request, res: Response) {
  res.status(201).json(await createParticipationRequest(getParam(req.params.projectId, "project id"), req.user.id, req.body.message));
}

export async function listProjectRequestsHandler(req: Request, res: Response) {
  res.json(await listProjectRequests(getParam(req.params.projectId, "project id"), req.user.id));
}

export async function listMyRequestsHandler(req: Request, res: Response) {
  res.json(await listMyRequests(req.user.id));
}

export async function updateParticipationRequestHandler(req: Request, res: Response) {
  res.json(await updateParticipationRequest(getParam(req.params.requestId, "request id"), req.user.id, req.body.status));
}

export async function cancelParticipationRequestHandler(req: Request, res: Response) {
  await cancelParticipationRequest(getParam(req.params.requestId, "request id"), req.user.id);
  res.status(204).send();
}
