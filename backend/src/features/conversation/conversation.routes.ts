import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createConversationHandler,
  getConversationHandler,
  listConversationsHandler,
} from "./conversation.controller.js";
import { createConversationSchema } from "./conversation.schema.js";

const router = Router();

router.use(authenticate);

router.get("/conversations", listConversationsHandler);

router.post(
  "/conversations",
  validate(createConversationSchema),
  createConversationHandler,
);

router.get("/conversations/:conversationId", getConversationHandler);

export default router;
