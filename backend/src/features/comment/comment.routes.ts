import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createCommentHandler,
  deleteCommentHandler,
  listCommentsHandler,
  updateCommentHandler,
} from "./comment.controller.js";
import { createCommentSchema, updateCommentSchema } from "./comment.schema.js";

const router = Router();

router.get(
  "/projects/:projectId/comments", 
  listCommentsHandler
);

router.post(
  "/projects/:projectId/comments",
  authenticate,
  validate(createCommentSchema),
  createCommentHandler,
);

router.patch(
  "/comments/:commentId",
  authenticate,
  validate(updateCommentSchema),
  updateCommentHandler,
);

router.delete(
  "/comments/:commentId", 
  authenticate, 
  deleteCommentHandler
);

export default router;
