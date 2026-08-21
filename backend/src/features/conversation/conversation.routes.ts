import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createConversationHandler,
  createMessageHandler,
  deleteMessageHandler,
  getConversationHandler,
  getMessageHandler,
  listMessagesHandler,
  listConversationsHandler,
  updateMessageHandler,
} from "./conversation.controller.js";
import { createConversationSchema } from "./conversation.schema.js";
import {
  createMessageSchema,
  updateMessageSchema,
} from "../message/message.schema.js";

const router = Router();

router.use(authenticate);

router.get("/conversations", listConversationsHandler);

router.post(
  "/conversations",
  validate(createConversationSchema),
  createConversationHandler,
);

router.get("/conversations/:conversationId", getConversationHandler);

router.get("/conversations/:conversationId/messages", listMessagesHandler);

router.post(
  "/conversations/:conversationId/messages",
  validate(createMessageSchema),
  createMessageHandler,
);

router.get("/messages/:messageId", getMessageHandler);

router.patch(
  "/messages/:messageId",
  validate(updateMessageSchema),
  updateMessageHandler,
);

router.delete("/messages/:messageId", deleteMessageHandler);

export default router;
