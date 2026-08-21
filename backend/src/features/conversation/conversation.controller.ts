import type { Request, Response } from "express";
import { getParam } from "../../utils/validation.js";
import {
  createConversation,
  getConversation,
  listConversations,
} from "./conversation.service.js";

export async function listConversationsHandler(req: Request, res: Response) {
  res.json(await listConversations(req.user.id));
}

export async function getConversationHandler(req: Request, res: Response) {
  res.json(await getConversation(getParam(req.params.conversationId, "conversation id"), req.user.id));
}

export async function createConversationHandler(req: Request, res: Response) {
  res.status(201).json(await createConversation(req.user.id, getParam(req.body.userId, "user id")));
}