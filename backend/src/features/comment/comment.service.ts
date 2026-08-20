import { ApiError } from "../../types/error.types.js";
import { assertCanViewProject } from "../project/project.authorization.js";
import {
  createComment as createCommentDb,
  deleteComment as deleteCommentDb,
  getCommentById,
  getCommentsByProjectId,
  updateComment as updateCommentDb,
} from "./comment.repository.js";
import { assertCommentAuthor } from "./comment.authorization.js";

export async function listComments(projectId: string, userId?: string) {
  await assertCanViewProject(projectId, userId);
  return getCommentsByProjectId(projectId);
}

export async function createComment(
  projectId: string,
  authorId: string,
  content: string,
  parentCommentId?: string,
) {
  await assertCanViewProject(projectId, authorId);

  if (parentCommentId) {
    const parent = await getCommentById(parentCommentId);

    if (!parent || parent.projectId !== projectId) {
      throw new ApiError(404, "Parent comment not found");
    }

    if (parent.parentCommentId) {
      throw new ApiError(422, "Replies cannot be nested more than one level");
    }
  }

  return createCommentDb({
    projectId,
    authorId,
    content,
    ...(parentCommentId !== undefined && { parentCommentId }),
  });
}

export async function updateComment(
  commentId: string,
  authorId: string,
  content: string,
) {
  const comment = await getCommentById(commentId);
  assertCommentAuthor(comment, authorId);
  return updateCommentDb(commentId, content);
}

export async function deleteComment(commentId: string, authorId: string) {
  const comment = await getCommentById(commentId);
  assertCommentAuthor(comment, authorId);
  await deleteCommentDb(commentId);
}