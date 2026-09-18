import { ApiError } from "../../types/error.types.js";
import { assertCanViewProject } from "../project/project.authorization.js";
import {
  createComment as createCommentDb,
  deleteComment as deleteCommentDb,
  getCommentById,
  getCommentDetailsById,
  getCommentsByProjectId,
  updateComment as updateCommentDb,
} from "./comment.repository.js";
import { assertCommentAuthor } from "./comment.authorization.js";
import { createNotification } from "../notification/notification.service.js";
import { getUser } from "../user/user.service.js";
import { getProjectOwnerId } from "../project/project.repository.js";

export async function listComments(projectId: string, userId?: string) {
  await assertCanViewProject(projectId, userId);
  return getCommentsByProjectId(projectId);
}

export async function getComment(commentId: string, userId?: string) {
  const comment = await getCommentById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  await assertCanViewProject(comment.projectId, userId);
  return getCommentDetailsById(commentId);
}

export async function createComment(
  projectId: string,
  authorId: string,
  content: string,
  parentCommentId?: string,
) {
  await assertCanViewProject(projectId, authorId);

  let parent = null;
  if (parentCommentId) {
    parent = await getCommentById(parentCommentId);

    if (!parent || parent.projectId !== projectId) {
      throw new ApiError(404, "Parent comment not found");
    }

    if (parent.parentCommentId) {
      throw new ApiError(422, "Replies cannot be nested more than one level");
    }
  }

  const createdComment = await createCommentDb({
    projectId,
    authorId,
    content,
    ...(parentCommentId !== undefined && { parentCommentId }),
  });

  const ownerId = await getProjectOwnerId(projectId);
  if (ownerId && ownerId !== authorId && ownerId !== parent?.authorId) {
    const user = await getUser(authorId);
    const authorName =
      user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.login
          ? `User ${user.login}`
          : "Someone";

    await createNotification(ownerId, {
      message: `${authorName} commented on your project`,
      referenceType: "COMMENT",
      referenceId: createdComment.id,
    });
  }

  if (parent && parent.authorId && parent.authorId !== authorId) {
    const user = await getUser(authorId);

    const authorName =
      user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.login
          ? `User ${user.login}`
          : "Someone";

    await createNotification(
      parent.authorId,
      {
        message: `${authorName} replied to your comment`,
        referenceType: "COMMENT",
        referenceId: createdComment.id,
      }
    )
  }

  return createdComment;
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

export async function deleteComment(
  commentId: string,
  authorId: string,
  isAdmin = false,
) {
  const comment = await getCommentById(commentId);

  if (!isAdmin) {
    assertCommentAuthor(comment, authorId);
  }

  await deleteCommentDb(commentId);
}