import type { getCommentById } from "./comment.repository.js";
import { ApiError } from "../../types/error.types.js";

export function assertCommentAuthor(
  comment: Awaited<ReturnType<typeof getCommentById>>,
  authorId: string,
) {
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.authorId !== authorId) {
    throw new ApiError(403, "You can only manage your own comments");
  }
}