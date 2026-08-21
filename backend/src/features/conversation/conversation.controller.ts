import type { Request, Response } from "express";
import { getParam } from "../../utils/validation.js";
import {
  createConversation,
  getConversation,
  listConversations,
} from "./conversation.service.js";
import {
  createMessage,
  deleteMessage,
  getMessage,
  listMessages,
  updateMessage,
} from "../message/message.service.js";

export async function listConversationsHandler(req: Request, res: Response) {
  res.json(await listConversations(req.user.id));
}

export async function getConversationHandler(req: Request, res: Response) {
  res.json(
    await getConversation(
      getParam(req.params.conversationId, "conversation id"),
      req.user.id,
    ),
  );
}

export async function createConversationHandler(req: Request, res: Response) {
  res.status(201).json(
    await createConversation(
      req.user.id,
      getParam(req.body.userId, "user id"),
    ),
  );
}

export async function listMessagesHandler(req: Request, res: Response) {
  res.json(
    await listMessages(
      getParam(req.params.conversationId, "conversation id"),
      req.user.id,
    ),
  );
}

export async function getMessageHandler(req: Request, res: Response) {
  res.json(
    await getMessage(
      getParam(req.params.messageId, "message id"), 
      req.user.id
    ),
  );
}

export async function createMessageHandler(req: Request, res: Response) {
  res
    .status(201)
    .json(
      await createMessage(
        getParam(req.params.conversationId, "conversation id"),
        req.user.id,
        req.body.content,
        req.body.parentMessageId,
      ),
    );
}

export async function updateMessageHandler(req: Request, res: Response) {
  res.json(
    await updateMessage(
      getParam(req.params.messageId, "message id"),
      req.user.id,
      req.body.content,
    ),
  );
}

export async function deleteMessageHandler(req: Request, res: Response) {
  await deleteMessage(
    getParam(req.params.messageId, "message id"),
    req.user.id,
  );
  res.status(204).send();
}
