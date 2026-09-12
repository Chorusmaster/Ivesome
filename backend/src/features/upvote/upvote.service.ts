import {
  addUpvote,
  countUpvotes,
  getUpvote as getUpvoteDb,
  removeUpvote,
} from "./upvote.repository.js";
import { createNotification } from "../notification/notification.service.js";
import { getProjectOwnerId } from "../project/project.repository.js";
import { getUser } from "../user/user.service.js";

export async function getUpvote(userId: string, projectId: string) {
  const [upvote, upvotes] = await Promise.all([
    getUpvoteDb(userId, projectId),
    countUpvotes(projectId),
  ]);

  return { isUpvoted: !!upvote, upvotes };
}

export async function toggleUpvote(userId: string, projectId: string) {
  const upvote = await getUpvoteDb(userId, projectId);

  if (upvote) {
    await removeUpvote(userId, projectId);
  } else {
    await addUpvote(userId, projectId);

    const ownerId = await getProjectOwnerId(projectId);
    if (ownerId && ownerId !== userId) {
      const user = await getUser(userId);
      const actorName = user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.login
          ? `User ${user.login}`
          : "Someone";

      await createNotification(ownerId, {
        message: `${actorName} upvoted your project`,
        referenceType: "PROJECT",
        referenceId: projectId,
      });
    }
  }

  return getUpvote(userId, projectId);
}
