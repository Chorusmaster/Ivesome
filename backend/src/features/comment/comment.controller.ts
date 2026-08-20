import type { Request, Response } from "express";
import {
  createComment,
  deleteComment,
  listComments,
  updateComment,
} from "./comment.service.js";
import { getParam } from "../../utils/validation.js";

export async function listCommentsHandler(req: Request, res: Response) {
  const projectId = getParam(req.params.projectId, "project id");
  const result = await listComments(projectId, req.user?.id);
  res.json(result);
}

export async function createCommentHandler(req: Request, res: Response) {
  const projectId = getParam(req.params.projectId, "project id");
  const result = await createComment(
    projectId,
    req.user.id,
    req.body.content,
    req.body.parentCommentId,
  );
  res.json(result);
}

export async function updateCommentHandler(req: Request, res: Response) {
  const commentId = getParam(req.params.commentId, "comment id");
  const result = await updateComment(commentId, req.user.id, req.body.content);
  res.json(result);
}

export async function deleteCommentHandler(req: Request, res: Response) {
  const commentId = getParam(req.params.commentId, "comment id");
  await deleteComment(commentId, req.user.id);
  res.status(204).send();
}
